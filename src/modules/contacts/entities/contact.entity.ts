import { randomUUID } from 'crypto';

export class Contact {
  readonly id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  readonly registrationDate: Date;
  customerId?: string;

  constructor() {
    this.id = randomUUID();
    const currentDate = new Date();
    this.registrationDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
  }
}
