import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';

export abstract class ContactsRepository {
  abstract create(data: CreateContactDto, customerId: string): Promise<Contact> | Contact;
  abstract findAll(customerId: string): Promise<Contact[]> | Contact[];
  abstract findOne(contact_id: string): Promise<Contact> | Contact;
  abstract findEmail(email: string): Promise<Contact> | Contact;
  abstract update(
    contact_id: string,
    data: UpdateContactDto,
  ): Promise<Contact> | Contact;
  abstract delete(contact_id: string): Promise<void> | void;
}
