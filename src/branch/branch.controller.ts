import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { CreateBranchPhoneDto } from './dto/create-branch-phone.dto';
import { UpdateBranchPhoneDto } from './dto/update-branch-phone.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Branch } from './entities/branch.entity';
import { BranchPhone } from './entities/branch-phone.entity';
import { OrderPivot } from './entities/order-pivot.entity';

@ApiTags('Branch')
@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  create(@Body() createBranchDto: CreateBranchDto): Promise<Branch> {
    return this.branchService.create(createBranchDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ): Promise<Branch> {
    return this.branchService.update(+id, updateBranchDto);
  }

  @Get()
  findAll(): Promise<Array<Branch>> {
    return this.branchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Branch> {
    return this.branchService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchService.remove(+id);
  }

  @Post(':id/phone')
  createPhone(
    @Param('id') branchId: string,
    @Body() createBranchPhoneDto: CreateBranchPhoneDto,
  ): Promise<BranchPhone> {
    return this.branchService.createPhone(+branchId, createBranchPhoneDto);
  }

  @Patch(':phoneKey')
  updatePhone(
    @Param('phoneKey') key: string,
    @Body() updateBranchPhoneDto: UpdateBranchPhoneDto,
  ): Promise<BranchPhone> {
    return this.branchService.updatePhone(key, updateBranchPhoneDto);
  }

  @Get(':id/phones')
  findAllPhones(@Param('id') branchId: string): Promise<Array<BranchPhone>> {
    return this.branchService.findAllPhones(+branchId);
  }

  @Get(':phoneKey')
  findOnePhone(@Param('phoneKey') key: string): Promise<BranchPhone> {
    return this.branchService.findOnePhone(key);
  }

  @Delete(':phoneKey')
  removePhone(@Param('phoneKey') key: string) {
    return this.branchService.removePhone(key);
  }

  @Post(':id/order')
  createOrder(
    @Param('id') branchId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<OrderPivot> {
    return this.branchService.createOrder(+branchId, createOrderDto);
  }

  @Get('orderKey')
  findOneOrder(@Param('orderKey') key: string): Promise<OrderPivot> {
    return this.branchService.findOneOrder(key);
  }

  @Get(':id/orders')
  findAllOrders(@Param('id') branchId: string): Promise<Array<OrderPivot>> {
    return this.branchService.findAllOrders(+branchId);
  }
}
