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
  create(createTicketDto: CreateTicketDto) {
    //todo
  }

  @UseRequestContext()
  update(id: number, updateTicketDto: UpdateTicketDto) {
    //todo
  }

  @UseRequestContext()
  findOne(id: number) {
    //todo
  }

  @UseRequestContext()
  findAll() {
    //todo
  }

  @UseRequestContext()
  remove(id: number) {
    //todo
  }

  @UseRequestContext()
  createAttachment(ticketId: number, createAttachmentDto: CreateAttachmentDto) {
    //todo
  }

  @UseRequestContext()
  findOneAttachment(key: string) {
    //todo
  }

  findAllAttachments(ticketId: number) {
    //todo
  }

  removeAttachment(key: string) {
    //todo
  }
}
