import { CreateCustomerDto } from '../dto/create-customer.dto';
import { Customer } from '../entities/customer.entity';

export abstract class CustomersRepository {
  abstract create(data: CreateCustomerDto): Promise<Customer> | Customer;
}
