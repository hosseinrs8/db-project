import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Attachment } from './entities/attachment.entity';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Attachment, Ticket])],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
