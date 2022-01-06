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
  create(createCustomerDto: CreateCustomerDto) {
    //todo
  }

  @UseRequestContext()
  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    //todo
  }

  @UseRequestContext()
  findOne(id: number) {
    //todo
  }

  @UseRequestContext()
  findAll() {
    //todo
  }

  @UseRequestContext()
  remove(id: number) {
    //todo
  }

  @UseRequestContext()
  createPhone(
    customerId: number,
    createCustomerPhoneDto: CreateCustomerPhoneDto,
  ) {
    //todo
  }

  @UseRequestContext()
  updatePhone(key: string, updateCustomerPhoneDto: UpdateCustomerPhoneDto) {
    //todo
  }

  @UseRequestContext()
  findAllPhones(customerId) {
    //todo
  }

  @UseRequestContext()
  findOnePhone(key: string) {
    //todo
  }

  @UseRequestContext()
  removePhone(key: string) {
    //todo
  }
}
