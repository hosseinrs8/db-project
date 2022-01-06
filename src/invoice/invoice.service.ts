import { Injectable } from '@nestjs/common';
import { InjectRepository, UseRequestContext } from '@mikro-orm/nestjs';
import { Invoice } from './entities/invoice.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { MikroORM } from '@mikro-orm/core';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: EntityRepository<Invoice>,
    private readonly orm: MikroORM,
  ) {}

  @UseRequestContext()
  create(createInvoiceDto: CreateInvoiceDto) {
    //todo
  }

  @UseRequestContext()
  findAll() {
    //todo
  }

  @UseRequestContext()
  findOne(id: number) {
    //todo
  }
}
