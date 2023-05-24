import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';

export abstract class CustomersRepository {
  abstract create(data: CreateCustomerDto): Promise<Customer> | Customer;
  abstract findAll(): Promise<Customer[]> | Customer[];
  abstract findOne(customer_id: string): Promise<Customer> | Customer;
  abstract update(customer_id: string, data: UpdateCustomerDto): Promise<Customer> | Customer;
  abstract delete(customer_id: string): Promise<void> | void;
}
