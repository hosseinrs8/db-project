import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BranchPhone } from './branch-phone.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  tableName: 'branches',
})
export class Branch {
  @PrimaryKey()
  id: number;

  @Property()
  manager: string;

  @Property()
  monthlyBudget: number;

  @Property()
  address: string;

  @Property()
  city: string;

  // @ApiProperty({
  //   type: () => CentralOffice,
  // })
  // @ManyToOne(() => CentralOffice)
  // centralOffice: CentralOffice; //fixme

  @ApiProperty({
    type: () => Customer,
    isArray: true,
  })
  @ManyToMany(() => Customer, (c) => c.shoppedBranches, {
    owner: true,
    nullable: true,
  })
  customers: Collection<Customer> = new Collection<Customer>(this);

  @ApiProperty({
    type: () => Invoice,
    isArray: true,
  })
  @OneToMany(() => Invoice, (i) => i.branch)
  invoices: Collection<Invoice> = new Collection<Invoice>(this);

  @ApiProperty({
    type: () => BranchPhone,
    isArray: true,
  })
  @OneToMany(() => BranchPhone, (bp) => bp.branch)
  phoneNumbers: Collection<BranchPhone> = new Collection<BranchPhone>(this);
}
