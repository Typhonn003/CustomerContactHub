import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { Customer } from '../../entities/customer.entity';
import { CustomersRepository } from '../customers.repository';

export class CustomersInMemoryRepository implements CustomersRepository {
  private database: Customer[] = [];

  create(data: CreateCustomerDto): Customer | Promise<Customer> {
    const newCustomer = new Customer();
    Object.assign(newCustomer, { ...data });
    this.database.push(newCustomer);
    return newCustomer;
  }
}
