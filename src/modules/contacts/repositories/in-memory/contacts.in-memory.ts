import { Injectable } from '@nestjs/common';
import { ContactsRepository } from '../contacts.repository';
import { Contact } from '../../entities/contact.entity';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { UpdateContactDto } from '../../dto/update-contact.dto';

@Injectable()
export class ContactsInMemoryRepository implements ContactsRepository {
  private database: Contact[] = [];

  create(data: CreateContactDto): Contact | Promise<Contact> {
    const newContact = new Contact();
    Object.assign(newContact, { ...data });
    this.database.push(newContact);
    return newContact;
  }
  findAll(): Contact[] | Promise<Contact[]> {
    return this.database;
  }
  findOne(contact_id: string): Contact | Promise<Contact> {
    const contact = this.database.find((contact) => contact.id === contact_id);
    return contact;
  }
  findEmail(email: string): Contact | Promise<Contact> {
    const contact = this.database.find((contact) => contact.email === email);
    return contact;
  }
  update(
    contact_id: string,
    data: UpdateContactDto,
  ): Contact | Promise<Contact> {
    const contactIndex = this.database.findIndex(
      (contact) => contact.id === contact_id,
    );
    this.database[contactIndex] = {
      ...this.database[contactIndex],
      ...data,
    };
    return this.database[contactIndex];
  }
  delete(contact_id: string): void | Promise<void> {
    const contactIndex = this.database.findIndex(
      (customer) => customer.id === contact_id,
    );
    this.database.splice(contactIndex, 1);
  }
}
