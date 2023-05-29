import { Injectable } from '@nestjs/common';
import { CustomersRepository } from '../customers.repository';
import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { UpdateCustomerDto } from '../../dto/update-customer.dto';
import { Customer } from '../../entities/customer.entity';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CustomersPrismaRepository implements CustomersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCustomerDto): Promise<Customer> {
    const customer = new Customer();
    Object.assign(customer, { ...data });
    const newCustomer = await this.prisma.customer.create({
      data: {
        id: customer.id,
        registrationDate: customer.registrationDate,
        fullName: customer.fullName,
        email: customer.email,
        password: customer.password,
        phoneNumber: customer.phoneNumber,
      },
    });
    return plainToInstance(Customer, newCustomer);
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany();
    return plainToInstance(Customer, customers);
  }

  async findOne(customer_id: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customer_id },
    });
    return plainToInstance(Customer, customer);
  }

  async findEmail(email: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });
    return customer;
  }

  async update(
    customer_id: string,
    data: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.prisma.customer.update({
      where: { id: customer_id },
      data: { ...data },
    });
    return plainToInstance(Customer, customer);
  }

  async delete(customer_id: string): Promise<void> {
    await this.prisma.customer.delete({
      where: { id: customer_id },
    });
  }
}
