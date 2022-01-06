import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerPhoneDto } from './dto/create-customer-phone.dto';
import { UpdateCustomerPhoneDto } from './dto/update-customer-phone.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  //todo set return types

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }

  @Post(':id/phone')
  createPhone(
    @Param('id') customerId: string,
    @Body() createCustomerPhoneDto: CreateCustomerPhoneDto,
  ) {
    return this.customerService.createPhone(
      +customerId,
      createCustomerPhoneDto,
    );
  }

  @Patch('phone/:key')
  updatePhone(
    @Param('key') key: string,
    @Body() updateCustomerPhoneDto: UpdateCustomerPhoneDto,
  ) {
    return this.customerService.updatePhone(key, updateCustomerPhoneDto);
  }

  @Get(':id/phone')
  findAllPhones(@Param('id') customerId: string) {
    return this.customerService.findAllPhones(customerId);
  }

  @Get('phone/:key')
  findOnePhone(@Param('key') key: string) {
    return this.customerService.findOnePhone(key);
  }

  @Delete('phone/:key')
  removePhone(@Param('key') key: string) {
    return this.customerService.removePhone(key);
  }
}
