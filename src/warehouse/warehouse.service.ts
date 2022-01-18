import { Injectable } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { InjectRepository, UseRequestContext } from '@mikro-orm/nestjs';
import { Branch } from '../branch/entities/branch.entity'
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
    @InjectRepository(Branch) //todo add
    private readonly branchRepository: EntityRepository<Branch>,
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
  create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    const c = this.orm.em.getConnection();
    return c.execute(
        `INSERT INTO warehouses (foreman, city, address, monthly_budget) VALUES ('${createWarehouseDto.foreman}', '${createWarehouseDto.city}', '${createWarehouseDto.address}', ${createWarehouseDto.monthlyBudget})`,
    );
  }

  @UseRequestContext()
  update(id: number, updateWarehouseDto: UpdateWarehouseDto): Promise<Warehouse> {
    const c = this.orm.em.getConnection();
    return c.execute(`UPDATE warehouses SET foreman = '${updateWarehouseDto.foreman}', city = '${updateWarehouseDto.city}', address = '${updateWarehouseDto.address}', monthly_budget = ${updateWarehouseDto.monthlyBudget} WHERE ID = ${ id }`);
  }

  @UseRequestContext()
  findOne(id: number): Promise<Warehouse> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM warehouses WHERE ID = ${ id }`);
  }

  @UseRequestContext()
  findAll(): Promise<Array<Warehouse>> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM warehouses`);
  }

  @UseRequestContext()
  remove(id: number): Promise<Warehouse> {
    const c = this.orm.em.getConnection();
    return c.execute(`DELETE FROM warehouses WHERE ID = ${ id }`);
  }

  @UseRequestContext()
  async createPhone(
    warehouseId: number,
    createWarehousePhoneDto: CreateWarehousePhoneDto,
  ): Promise<WarehousePhone> {
    const warehouse = await this.warehouseRepository.findOne({id: warehouseId}, ['phoneNumbers']);
    const phone = new WarehousePhone(warehouse, createWarehousePhoneDto.number);
    const qb = this.warehousePhoneRepository.createQueryBuilder();
    await qb.insert(phone).execute('get');
    return phone;
  }

  @UseRequestContext()
  async updatePhone(key: string, updateWarehousePhoneDto: UpdateWarehousePhoneDto): Promise<WarehousePhone> {
    const qb = this.warehousePhoneRepository.createQueryBuilder();
    const phone = await this.findOnePhone(key);
    phone.number = updateWarehousePhoneDto.number || phone.number;
    await qb.update(phone).execute('get');
    return phone;
  }

  @UseRequestContext()
  findAllPhones(warehouseId: number): Promise<Array<WarehousePhone>> {
    const qb = this.warehousePhoneRepository.createQueryBuilder();
    return qb.select('*').where({warehouse: warehouseId}).execute(('all'));
  }

  @UseRequestContext()
  findOnePhone(key: string): Promise<WarehousePhone> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM warehouse_phones WHERE KEY = '${ key }'`);
  }

  @UseRequestContext()
  removePhone(key: string): Promise<WarehousePhone> {
    const c = this.orm.em.getConnection();
    return c.execute(`DELETE FROM warehousePhone WHERE KEY = '${ key }'`);
  }

  @UseRequestContext()
  async createStockProduct(
    warehouseId: number,
    createStockProductDto: CreateStockProductDto,
  ): Promise<StockProducts> {
    const warehouse = await this.warehouseRepository.findOne({id: warehouseId}, ['stockProducts']);
    const stock = new StockProducts(warehouse, createStockProductDto.availableProductCount, createStockProductDto.productName);
    const qb = this.stockProductsRepository.createQueryBuilder();
    await qb.insert(stock).execute('get');
    return stock;
  }

  @UseRequestContext()
  async updateStockProduct(
    key: string,
    updateStockProductDto: UpdateStockProductDto,
  ): Promise<StockProducts> {
    const c = this.orm.em.getConnection();
    return c.execute(`UPDATE stock_products SET product_name = '${updateStockProductDto.productName}', available_product_count = ${updateStockProductDto.availableProductCount}`);
  }

  @UseRequestContext()
  findOneStockProducts(key: string): Promise<WarehousePhone> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM stock_products WHERE KEY = '${ key }'`);
  }

  @UseRequestContext()
  findAllStockProducts(warehouseId: number): Promise<StockProducts> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM stock_products`);
  }

  @UseRequestContext()
  async createDelivery(warehouseId: number, createDeliveryDto: CreateOrderDto): Promise<DeliveryPivot> {
    const warehouse = await this.warehouseRepository.findOne({id: warehouseId}, ['deliveries']); //todo: there is not exist
    const branch = await this.branchRepository.findOne( {} ) // todo ???
    const delivery = new DeliveryPivot(warehouse, branch, createDeliveryDto.typeOfProduct, createDeliveryDto.numberOfProduct, createDeliveryDto.deliveryDate);
    const qb = this.deliveryPlotRepository.createQueryBuilder();
    await qb.insert(delivery).execute('get');
    return delivery;
  }

  @UseRequestContext()
  findOneDelivery(key: string): Promise<DeliveryPivot> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM warehouse_branch_delivery_pivot WHERE KEY = '${ key }'`);
  }

  @UseRequestContext()
  findAllDeliveries(warehouseId: number): Promise<DeliveryPivot> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM warehouse_branch_delivery_pivot`);  }
}
