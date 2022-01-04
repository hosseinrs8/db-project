import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Customer } from './entities/customer.entity';
import { CustomerPhone } from './entities/customer-phone.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Customer, CustomerPhone])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
