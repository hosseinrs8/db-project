import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateOrderDto } from '../branch/dto/create-order.dto';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { CreateWarehousePhoneDto } from './dto/create-warehouse-phone.dto';
import { UpdateWarehousePhoneDto } from './dto/update-warehouse-phone.dto';
import { CreateStockProductDto } from './dto/create-stock-product.dto';
import { UpdateStockProductDto } from './dto/update-stock-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Warehouse')
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  //todo set return types

  @Post()
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.create(createWarehouseDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ) {
    return this.warehouseService.update(+id, updateWarehouseDto);
  }

  @Get()
  findAll() {
    return this.warehouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehouseService.remove(+id);
  }

  @Post(':id/phone')
  createPhone(
    @Param('id') id: string,
    @Body() createWarehousePhoneDto: CreateWarehousePhoneDto,
  ) {
    return this.warehouseService.createPhone(+id, createWarehousePhoneDto);
  }

  @Patch('phone/:key')
  updatePhone(
    @Param('key') key: string,
    @Body() updateWarehousePhoneDto: UpdateWarehousePhoneDto,
  ) {
    return this.warehouseService.updatePhone(key, updateWarehousePhoneDto);
  }

  @Get(':id/phones')
  findAllPhones(@Param('id') warehouseId: string) {
    return this.warehouseService.findAllPhones(+warehouseId);
  }

  @Get('phone/:key')
  findOnePhone(@Param('key') key: string) {
    return this.warehouseService.findOnePhone(key);
  }

  @Delete('phone/:key')
  removePhone(@Param('key') key: string) {
    return this.warehouseService.removePhone(key);
  }

  @Post(':id/stock-product')
  createStockProduct(
    @Param('id') warehouseId: string,
    @Body() createStockProductDto: CreateStockProductDto,
  ) {
    return this.warehouseService.createStockProduct(
      +warehouseId,
      createStockProductDto,
    );
  }

  @Patch('stock-product/:key')
  updateStockProduct(
    @Param('key') key: string,
    @Body() updateStockProductDto: UpdateStockProductDto,
  ) {
    return this.warehouseService.updateStockProduct(key, updateStockProductDto);
  }

  @Get('stock-products/key') //todo add
  findOneStock(@Param('key') key: string) {
    return this.warehouseService.findOneStockProducts(key);
  }

  @Get(':id/stock-products')
  findAllStockProducts(@Param('id') id: string) {
    return this.warehouseService.findAllStockProducts(+id);
  }

  @Post(':id/order')
  createDelivery(
    @Param('id') warehouseId: string,
    @Body() createDeliveryDto: CreateOrderDto,
  ) {
    return this.warehouseService.createDelivery(
      +warehouseId,
      createDeliveryDto,
    );
  }

  @Get('order/:key')
  findOneDelivery(@Param('key') key: string) {
    return this.warehouseService.findOneDelivery(key);
  }

  @Get(':id/orders')
  findAllDeliveries(@Param('id') warehouseId: string) {
    return this.warehouseService.findAllDeliveries(+warehouseId);
  }
}
