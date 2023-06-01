import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsRepository) {}

  async create(createContactDto: CreateContactDto, customerId: string) {
    const findUser = await this.contactsRepository.findEmail(
      createContactDto.email,
    );
    if (findUser) {
      throw new ConflictException('Contact already exists');
    }
    const contact = await this.contactsRepository.create(
      createContactDto,
      customerId,
    );
    return contact;
  }

  async findAll() {
    const contacts = await this.contactsRepository.findAll();
    return contacts;
  }

  async findOne(contact_id: string) {
    const contact = await this.contactsRepository.findOne(contact_id);
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  async findEmail(email: string) {
    const customer = await this.contactsRepository.findEmail(email);
    return customer;
  }

  async isOwner(contactId: string, customerId: string): Promise<boolean> {
    const contact = await this.contactsRepository.findOne(contactId);
    if (contact.customerId === customerId) {
      return true;
    }
    return false;
  }

  async update(
    contact_id: string,
    updateContactDto: UpdateContactDto,
    customerId: string,
  ) {
    const findUser = await this.contactsRepository.findOne(contact_id);
    if (!findUser) {
      throw new NotFoundException('Contact not found');
    }
    const isOwner = await this.isOwner(contact_id, customerId);
    if (!isOwner) {
      throw new UnauthorizedException('You are not the owner of this contact');
    }
    if (updateContactDto.email && updateContactDto.email !== findUser.email) {
      const findEmail = await this.contactsRepository.findEmail(
        updateContactDto.email,
      );
      if (findEmail) {
        throw new ConflictException('Email already in use');
      }
    }
    const customer = await this.contactsRepository.update(
      contact_id,
      updateContactDto,
    );
    return customer;
  }

  async remove(contact_id: string, customerId: string) {
    const findUser = await this.contactsRepository.findOne(contact_id);
    if (!findUser) {
      throw new NotFoundException('Contact not found');
    }
    const isOwner = await this.isOwner(contact_id, customerId);
    if (!isOwner) {
      throw new UnauthorizedException('You are not the owner of this contact');
    }
    await this.contactsRepository.delete(contact_id);
  }
}
