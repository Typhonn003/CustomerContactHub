import { Module } from '@nestjs/common';
import { CustomersModule } from './modules/customers/customers.module';
import { AuthModule } from './modules/auth/auth.module';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
  imports: [CustomersModule, ContactsModule, AuthModule],
})
export class AppModule {}
