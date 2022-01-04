import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Invoice } from './entities/invoice.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Invoice])],
  providers: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
