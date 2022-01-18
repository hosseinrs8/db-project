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
    const c = this.orm.em.getConnection();
    return c.execute(
        `INSERT INTO invoices (price, customer_id, address, city, branch_id, product_ids) VALUES (${createInvoiceDto.price}, ${createInvoiceDto.customerId}, '${createInvoiceDto.address}', '${createInvoiceDto.city}', ${createInvoiceDto.branchId}, ${createInvoiceDto.productIds})`,
    );
  }

  @UseRequestContext()
  findAll(): Promise<Array<Invoice>> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM invoices`);
  }

  @UseRequestContext()
  findOne(id: number): Promise<Invoice> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM invoices WHERE ID = ${ id }`);
  }
}
