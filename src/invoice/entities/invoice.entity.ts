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
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    type: () => Customer,
  })
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

  @ApiProperty({
    type: () => Branch,
  })
  @ManyToOne(() => Branch)
  branch: Branch;

  @ApiProperty({
    type: () => Product,
    isArray: true,
  })
  @OneToMany(() => Product, (p) => p.invoice)
  products: Collection<Product> = new Collection<Product>(this);
}
