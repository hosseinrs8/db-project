import { Injectable } from '@nestjs/common';
import { InjectRepository, UseRequestContext } from '@mikro-orm/nestjs';
import { Ticket } from './entities/ticket.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Attachment } from './entities/attachment.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { MikroORM } from '@mikro-orm/core';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: EntityRepository<Ticket>,
    @InjectRepository(Attachment)
    private readonly attachmentRepository: EntityRepository<Attachment>,
    private readonly orm: MikroORM,
  ) {}

  @UseRequestContext()
  create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const c = this.orm.em.getConnection();
    return c.execute(
        `INSERT INTO tickets (message, subject, customer_id) VALUES ('${createTicketDto.message}', '${createTicketDto.subject}', '${createTicketDto.customerId}')`,
    );
  }

  @UseRequestContext()
  update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const c = this.orm.em.getConnection();
    return c.execute(
        `UPDATE tickets SET message = '${updateTicketDto.message}', subject = '${updateTicketDto.subject}', supporter_id = '${updateTicketDto.supporterId}', resolve_date = ${updateTicketDto.resolvedDate}`,
    );
  }

  @UseRequestContext()
  findOne(id: number): Promise<Ticket> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM tickets WHERE ID = ${ id }`);
  }

  @UseRequestContext()
  findAll(): Promise<Array<Ticket>> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM tickets`);
  }

  @UseRequestContext()
  remove(id: number): Promise<Ticket> {
    const c = this.orm.em.getConnection();
    return c.execute(`DELETE FROM tickets WHERE ID = ${ id }`);
  }

  @UseRequestContext()
  createAttachment(ticketId: number, createAttachmentDto: CreateAttachmentDto): Promise<Attachment> { //todo: Why ticketId didn't use?
    const c = this.orm.em.getConnection();
    return c.execute(
        `INSERT INTO ticket_attachments (attachment, file_name) VALUES ('${createAttachmentDto.attachment}', '${createAttachmentDto.fileName}')`,
    );
  }

  @UseRequestContext()
  findOneAttachment(key: string): Promise<Attachment> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM ticket_attachments WHERE KEY = '${ key }'`);
  }

  findAllAttachments(ticketId: number): Promise<Array<Attachment>> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM ticket_attachments`);
  }

  removeAttachment(key: string): Promise<Attachment> {
    const c = this.orm.em.getConnection();
    return c.execute(`DELETE FROM ticket_attachments WHERE KEY = '${ key }'`);
  }
}
