import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersRepository } from './repositories/customers.repository';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const findUser = await this.customersRepository.findEmail(
      createCustomerDto.email,
    );
    if (findUser) {
      throw new ConflictException('User already exists');
    }
    const customer = await this.customersRepository.create(createCustomerDto);
    return customer;
  }

  async findAll() {
    const customers = await this.customersRepository.findAll();
    return customers;
  }

  async findOne(customer_id: string) {
    const customer = await this.customersRepository.findOne(customer_id);
    if (!customer) {
      throw new NotFoundException('User not found');
    }
    return customer;
  }

  async update(customer_id: string, updateCustomerDto: UpdateCustomerDto) {
    const findUser = await this.customersRepository.findOne(customer_id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    if (updateCustomerDto.email && updateCustomerDto.email !== findUser.email) {
      const findEmail = await this.customersRepository.findEmail(
        updateCustomerDto.email,
      );
      if (findEmail) {
        throw new ConflictException('Email already in use');
      }
    }
    const customer = await this.customersRepository.update(
      customer_id,
      updateCustomerDto,
    );
    return customer;
  }

  async remove(customer_id: string) {
    const findUser = await this.customersRepository.findOne(customer_id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    await this.customersRepository.delete(customer_id);
  }
}
