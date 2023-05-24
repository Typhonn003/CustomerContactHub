import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class Customer {
  readonly id: string;
  fullName: string;
  email: string;
  @Exclude()
  password: string;
  phoneNumber: string;
  readonly registrationDate: Date;

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
