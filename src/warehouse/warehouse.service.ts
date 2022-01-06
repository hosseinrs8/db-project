import { Injectable } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { InjectRepository, UseRequestContext } from '@mikro-orm/nestjs';
import { Warehouse } from './entities/warehouse.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { WarehousePhone } from './entities/warehouse-phone.entity';
import { StockProducts } from './entities/stock-products.entity';
import { DeliveryPivot } from './entities/delivery-pivot.entity';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { CreateWarehousePhoneDto } from './dto/create-warehouse-phone.dto';
import { UpdateWarehousePhoneDto } from './dto/update-warehouse-phone.dto';
import { CreateStockProductDto } from './dto/create-stock-product.dto';
import { UpdateStockProductDto } from './dto/update-stock-product.dto';
import { CreateOrderDto } from '../branch/dto/create-order.dto';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: EntityRepository<Warehouse>,
    @InjectRepository(WarehousePhone)
    private readonly warehousePhoneRepository: EntityRepository<WarehousePhone>,
    @InjectRepository(StockProducts)
    private readonly stockProductsRepository: EntityRepository<StockProducts>,
    @InjectRepository(DeliveryPivot)
    private readonly deliveryPlotRepository: EntityRepository<DeliveryPivot>,
    private readonly orm: MikroORM,
  ) {}

  @UseRequestContext()
  create(createWarehouseDto: CreateWarehouseDto) {
    //todo
  }

  @UseRequestContext()
  update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    //todo
  }

  @UseRequestContext()
  findOne(id: number) {
    //todo
  }

  @UseRequestContext()
  findAll() {
    //todo
  }

  @UseRequestContext()
  remove(id: number) {
    //todo
  }

  @UseRequestContext()
  createPhone(
    warehouseId: number,
    createWarehousePhoneDto: CreateWarehousePhoneDto,
  ) {
    //todo
  }

  @UseRequestContext()
  updatePhone(key: string, updateWarehousePhoneDto: UpdateWarehousePhoneDto) {
    //todo
  }

  @UseRequestContext()
  findAllPhones(warehouseId: number) {
    //todo
  }

  @UseRequestContext()
  findOnePhone(key: string) {
    //todo
  }

  @UseRequestContext()
  removePhone(key: string) {
    //todo
  }

  @UseRequestContext()
  createStockProduct(
    warehouseId: number,
    createStockProductDto: CreateStockProductDto,
  ) {
    //todo
  }

  @UseRequestContext()
  updateStockProduct(
    key: string,
    updateStockProductDto: UpdateStockProductDto,
  ) {
    //todo
  }

  @UseRequestContext()
  findAllStockProducts(warehouseId: number) {
    //todo
  }

  @UseRequestContext()
  createDelivery(warehouseId: number, createDeliveryDto: CreateOrderDto) {
    //todo
  }

  @UseRequestContext()
  findOneDelivery(key: string) {
    //todo
  }

  @UseRequestContext()
  findAllDeliveries(warehouseId: number) {
    //todo
  }
}
