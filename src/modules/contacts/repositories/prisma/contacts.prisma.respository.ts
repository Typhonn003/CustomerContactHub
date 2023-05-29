import { Injectable } from '@nestjs/common';
import { ContactsRepository } from '../contacts.repository';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { UpdateContactDto } from '../../dto/update-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateContactDto, customerId: string): Promise<Contact> {
    const contact = new Contact();
    Object.assign(contact, { ...data });
    const newContact = await this.prisma.contact.create({
      data: {
        id: contact.id,
        registrationDate: contact.registrationDate,
        fullName: contact.fullName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        customerId: customerId,
      },
    });
    return newContact;
  }

  async findAll(customerId: string): Promise<Contact[]> {
    const contacts = await this.prisma.contact.findMany({
      where: {
        customerId
      }
    });
    return contacts;
  }

  async findOne(contact_id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { id: contact_id },
    });
    return contact;
  }

  async findEmail(email: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { email: email },
    });
    return contact;
  }

  async update(contact_id: string, data: UpdateContactDto): Promise<Contact> {
    const contact = await this.prisma.contact.update({
      where: { id: contact_id },
      data: { ...data },
    });
    return contact;
  }

  async delete(contact_id: string): Promise<void> {
    await this.prisma.contact.delete({
      where: { id: contact_id },
    });
  }
}
