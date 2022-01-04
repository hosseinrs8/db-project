import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CentralOffice } from '../../central-office/entities/central-office.entity';
import { BranchPhone } from './branch-phone.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Customer } from '../../customer/entities/customer.entity';

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

  @ManyToOne(() => CentralOffice)
  centralOffice: CentralOffice;

  @ManyToMany(() => Customer, (c) => c.shoppedBranches, {
    owner: true,
    nullable: true,
  })
  customers: Collection<Customer> = new Collection<Customer>(this);

  @OneToMany(() => Invoice, (i) => i.branch)
  invoices: Collection<Invoice> = new Collection<Invoice>(this);

  @OneToMany(() => BranchPhone, (bp) => bp.branch)
  phoneNumbers: Collection<BranchPhone> = new Collection<BranchPhone>(this);
}
