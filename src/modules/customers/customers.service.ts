import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
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

  async findEmail(email: string) {
    const customer = await this.customersRepository.findEmail(email);
    return customer;
  }

  async getProfile(customer_id: string) {
    const customer = await this.customersRepository.findProfile(customer_id);
    return customer;
  }

  isOwner(customer_id: string, token_customer_id: string): boolean {
    if (customer_id === token_customer_id) {
      return true;
    }
    return false;
  }

  async update(
    customer_id: string,
    updateCustomerDto: UpdateCustomerDto,
    token_customer_id: string,
  ) {
    const findUser = await this.customersRepository.findOne(customer_id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    const isOwner = this.isOwner(customer_id, token_customer_id);
    if (!isOwner) {
      throw new UnauthorizedException('You are not the owner of this content');
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

  async remove(customer_id: string, token_customer_id: string) {
    const findUser = await this.customersRepository.findOne(customer_id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    const isOwner = this.isOwner(customer_id, token_customer_id);
    if (!isOwner) {
      throw new UnauthorizedException('You are not the owner of this content');
    }
    await this.customersRepository.delete(customer_id);
  }
}
