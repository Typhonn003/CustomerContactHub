import {
  ConflictException,
  Injectable,
  NotFoundException,
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
    const contact = await this.contactsRepository.create(createContactDto, customerId);
    return contact;
  }

  async findAll() {
    const contact = await this.contactsRepository.findAll();
    return contact;
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

  async update(contact_id: string, updateContactDto: UpdateContactDto) {
    const findUser = await this.contactsRepository.findOne(contact_id);
    if (!findUser) {
      throw new NotFoundException('User not found');
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

  async remove(contact_id: string) {
    const findUser = await this.contactsRepository.findOne(contact_id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    await this.contactsRepository.delete(contact_id);
  }
}
