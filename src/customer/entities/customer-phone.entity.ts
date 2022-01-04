import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Customer } from './customer.entity';

@Entity({
  tableName: 'customer_phones',
})
export class CustomerPhone {
  @Property({ primary: true })
  key: string;

  @ManyToOne(() => Customer)
  customer: Customer;

  @Property()
  number: string;

  constructor(customer: Customer, number: string) {
    this.customer = customer;
    this.number = number;
    this.key = `${customer.id}${number}`;
  }
}
