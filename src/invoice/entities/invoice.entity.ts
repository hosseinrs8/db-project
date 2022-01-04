import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Branch } from '../../branch/entities/branch.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { Product } from '../../product/entities/product.entity';

export enum PaymentStatus {
  pending = 'pending',
  paid = 'paid',
  returned = 'returned',
}

@Entity({
  tableName: 'invoices',
})
export class Invoice {
  @PrimaryKey()
  id: number;

  @Property()
  price: number;

  @ManyToOne(() => Customer)
  customer: Customer;

  @Enum(() => PaymentStatus)
  paymentStatus: PaymentStatus = PaymentStatus.pending;

  @Property({ onCreate: (i: Invoice) => (i.orderDate = new Date()) })
  orderDate: Date;

  @Property({ nullable: true })
  paymentDate: Date;

  @Property()
  address: string;

  @Property()
  city: string;

  @ManyToOne(() => Branch)
  branch: Branch;

  @OneToMany(() => Product, (p) => p.invoice)
  products: Collection<Product> = new Collection<Product>(this);
}
