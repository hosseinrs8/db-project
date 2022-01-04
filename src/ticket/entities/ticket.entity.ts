import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
// import { Supporter } from '../../employee/entities/supporter.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { Attachment } from './attachment.entity';
import { Supporter } from '../../employee/entities/supporter.entity';

@Entity({
  tableName: 'tickets',
})
export class Ticket {
  @PrimaryKey()
  id: number;

  @Property()
  message: string;

  @Property()
  subject: string;

  @OneToOne(() => Supporter, (s) => s.ticket)
  supporter: Supporter;

  @ManyToOne(() => Customer)
  customer: Customer;

  @Property({ nullable: true })
  resolvedDate: Date;

  @OneToMany(() => Attachment, (a) => a.ticket)
  attachments: Collection<Attachment> = new Collection<Attachment>(this);
}
