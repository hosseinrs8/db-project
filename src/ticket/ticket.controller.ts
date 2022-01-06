import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  //todo set return types

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }

  @Post(':id/attachment')
  createAttachment(
    @Param('id') ticketId: string,
    @Body() createAttachmentDto: CreateAttachmentDto,
  ) {
    return this.ticketService.createAttachment(+ticketId, createAttachmentDto);
  }

  @Get('attachment/:key')
  findOneAttachment(@Param('key') key: string) {
    return this.ticketService.findOneAttachment(key);
  }

  @Get(':id/phones')
  findAllAttachments(@Param('id') ticketId: string) {
    return this.ticketService.findAllAttachments(+ticketId);
  }

  @Delete('attachment/:key')
  removeAttachment(@Param('key') key: string) {
    return this.ticketService.removeAttachment(key);
  }
}
