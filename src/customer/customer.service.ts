import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Customer } from './entities/customer.entity';
import { InjectRepository, UseRequestContext } from '@mikro-orm/nestjs';
import { CustomerPhone } from './entities/customer-phone.entity';
import { MikroORM } from '@mikro-orm/core';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerPhoneDto } from './dto/create-customer-phone.dto';
import { UpdateCustomerPhoneDto } from './dto/update-customer-phone.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: EntityRepository<Customer>,
    @InjectRepository(CustomerPhone)
    private readonly customerPhoneRepository: EntityRepository<CustomerPhone>,
    private readonly orm: MikroORM,
  ) {}

  @UseRequestContext()
  create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const c = this.orm.em.getConnection();
    return c.execute(
      `INSERT INTO customers (name) VALUES ('${createCustomerDto.name}')`,
    );
  }

  @UseRequestContext()
  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const c = this.orm.em.getConnection();
    return c.execute(
      `UPDATE customers SET name = '${updateCustomerDto.name}' WHERE ID = '${id}'`,
    );
  }

  @UseRequestContext()
  findOne(id: number): Promise<Customer> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM customers WHERE ID = '${id}'`);
  }

  @UseRequestContext()
  findAll(): Promise<Array<Customer>> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM customers`);
  }

  @UseRequestContext()
  remove(id: number): Promise<Customer> {
    const c = this.orm.em.getConnection();
    return c.execute(`DELETE FROM customers WHERE ID = '${id}'`);
  }

  @UseRequestContext()
  async createPhone(
    customerId: number,
    createCustomerPhoneDto: CreateCustomerPhoneDto,
  ): Promise<CustomerPhone> {
    const customer = await this.customerRepository.findOne({ id: customerId }, [
      'phoneNumbers',
    ]);
    const phone = new CustomerPhone(customer, createCustomerPhoneDto.number);
    const qb = this.customerPhoneRepository.createQueryBuilder();
    await qb.insert(phone).execute('get');
    return phone;
  }

  @UseRequestContext()
  async updatePhone(
    key: string,
    updateCustomerPhoneDto: UpdateCustomerPhoneDto,
  ): Promise<CustomerPhone> {
    const qb = this.customerPhoneRepository.createQueryBuilder();
    const phone = await this.findOnePhone(key);
    phone.number = updateCustomerPhoneDto.number || phone.number;
    await qb.update(phone).execute('get');
    return phone;
  }

  @UseRequestContext()
  findAllPhones(customerId: number): Promise<Array<CustomerPhone>> {
    const qb = this.customerPhoneRepository.createQueryBuilder();
    return qb.select('*').where({ customer: customerId }).execute('all');
  }

  @UseRequestContext()
  findOnePhone(key: string): Promise<CustomerPhone> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM customer_phones WHERE KEY = '${key}'`);
  }

  @UseRequestContext()
  removePhone(key: string): Promise<CustomerPhone> {
    const c = this.orm.em.getConnection();
    return c.execute(`DELETE FROM customer_phones WHERE KEY = '${key}'`);
  }
}
