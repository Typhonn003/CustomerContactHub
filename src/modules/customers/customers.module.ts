import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomersRepository } from './repositories/customers.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CustomersPrismaRepository } from './repositories/prisma/customers.prisma.repository';
import { CustomersInMemoryRepository } from './repositories/in-memory/customers.in-memory.repository';

@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    PrismaService,
    { provide: CustomersRepository, useClass: CustomersPrismaRepository },
  ],
  exports: [CustomersService],
})
export class CustomersModule {}
