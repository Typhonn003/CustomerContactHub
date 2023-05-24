import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { UpdateCustomerDto } from '../../dto/update-customer.dto';
import { Customer } from '../../entities/customer.entity';
import { CustomersRepository } from '../customers.repository';
import { plainToInstance } from 'class-transformer';

export class CustomersInMemoryRepository implements CustomersRepository {
  private database: Customer[] = [];

  create(data: CreateCustomerDto): Customer | Promise<Customer> {
    const newCustomer = new Customer()
    Object.assign(newCustomer, { ...data })
    this.database.push(newCustomer)
    return plainToInstance(Customer, newCustomer);
  }
  findAll(): Customer[] | Promise<Customer[]> {
    return plainToInstance(Customer, this.database);
  }
  findOne(customer_id: string): Customer | Promise<Customer> {
    const customer = this.database.find(customer => customer.id === customer_id)
    return plainToInstance(Customer, customer);
  }
  update(customer_id: string, data: UpdateCustomerDto): Customer | Promise<Customer> {
    const customerIndex = this.database.findIndex(customer => customer.id === customer_id)
    this.database[customerIndex] = {
      ...this.database[customerIndex],
      ...data
    }
    return plainToInstance(Customer, this.database[customerIndex]);
  }
  delete(customer_id: string): void | Promise<void> {
    const customerIndex = this.database.findIndex(customer => customer.id === customer_id)
    this.database.splice(customerIndex, 1)
  }
}
