import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Ticket } from './ticket.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  tableName: 'ticket_attachments',
})
export class Attachment {
  @Property({ primary: true })
  key: string;

  @ApiProperty({
    type: () => Ticket,
  })
  @ManyToOne(() => Ticket)
  ticket: Ticket;

  @Property()
  attachment: string; //binaryCode

  @Property()
  fileName: string;

  constructor(name: string, ticket: Ticket) {
    this.ticket = ticket;
    this.fileName = name;
    this.key = `${ticket.id}${name}`;
  }
}
