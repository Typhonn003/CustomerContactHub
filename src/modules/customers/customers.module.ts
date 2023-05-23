import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomersRepository } from './repositories/customers.repository';
import { CustomersInMemoryRepository } from './repositories/in-memory/customers.in-memory.repository';

@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    { provide: CustomersRepository, useClass: CustomersInMemoryRepository },
  ],
})
export class CustomersModule {}
