import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersRepository } from './repositories/customers.repository';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) { }

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.customersRepository.create(createCustomerDto);
    return customer;
  }

  async findAll() {
    const customers = await this.customersRepository.findAll()
    return customers;
  }

  async findOne(customer_id: string) {
    const customer = await this.customersRepository.findOne(customer_id)
    return customer
  }

  async update(customer_id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customersRepository.update(customer_id, updateCustomerDto)
    return customer
  }

  async remove(customer_id: string) {
    await this.customersRepository.delete(customer_id)
  }
}
