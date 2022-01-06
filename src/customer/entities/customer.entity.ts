import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CustomerPhone } from './customer-phone.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Branch } from '../../branch/entities/branch.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  tableName: 'customers',
})
export class Customer {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @ApiProperty({
    type: () => Branch,
    isArray: true,
  })
  @ManyToMany(() => Branch, (b) => b.customers)
  shoppedBranches: Collection<Branch> = new Collection<Branch>(this);

  @ApiProperty({
    type: () => Invoice,
    isArray: true,
  })
  @OneToMany(() => Invoice, (i) => i.customer)
  invoices: Collection<Invoice> = new Collection<Invoice>(this);

  @ApiProperty({
    type: () => Ticket,
    isArray: true,
  })
  @OneToMany(() => Ticket, (t) => t.customer, { nullable: true })
  tickets: Collection<Ticket> = new Collection<Ticket>(this);

  @ApiProperty({
    type: () => CustomerPhone,
    isArray: true,
  })
  @OneToMany(() => CustomerPhone, (cp) => cp.customer)
  phoneNumbers: Collection<CustomerPhone> = new Collection<CustomerPhone>(this);
}
