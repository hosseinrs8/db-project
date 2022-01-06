import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Customer } from '../../customer/entities/customer.entity';
import { Attachment } from './attachment.entity';
import { Supporter } from '../../employee/entities/supporter.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    type: () => Supporter,
  })
  @OneToOne(() => Supporter, (s) => s.ticket, { nullable: true })
  supporter: Supporter;

  @ApiProperty({
    type: () => Customer,
  })
  @ManyToOne(() => Customer)
  customer: Customer;

  @Property({ nullable: true })
  resolvedDate: Date;

  @ApiProperty({
    type: () => Attachment,
    isArray: true,
  })
  @OneToMany(() => Attachment, (a) => a.ticket)
  attachments: Collection<Attachment> = new Collection<Attachment>(this);
}
