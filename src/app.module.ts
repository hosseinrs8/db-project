import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { dbSetups } from './config/db-setup';
import { CentralOfficeModule } from './central-office/central-office.module';
import { EmployeeModule } from './employee/employee.module';
import { TicketModule } from './ticket/ticket.module';
import { CustomerModule } from './customer/customer.module';
import { BranchModule } from './branch/branch.module';
import { ProductModule } from './product/product.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { InvoiceModule } from './invoice/invoice.module';
import { FactoryModule } from './factory/factory.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(dbSetups),
    CentralOfficeModule,
    EmployeeModule,
    TicketModule,
    CustomerModule,
    BranchModule,
    ProductModule,
    WarehouseModule,
    InvoiceModule,
    FactoryModule,
  ],
})
export class AppModule {}
