import { Injectable } from '@nestjs/common';
import { InjectRepository, UseRequestContext } from '@mikro-orm/nestjs';
import { Branch } from './entities/branch.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { MikroORM } from '@mikro-orm/core';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { CreateBranchPhoneDto } from './dto/create-branch-phone.dto';
import { UpdateBranchPhoneDto } from './dto/update-branch-phone.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { BranchPhone } from './entities/branch-phone.entity';
import { OrderPivot } from './entities/order-pivot.entity';
import { Warehouse } from '../warehouse/entities/warehouse.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: EntityRepository<Branch>,
    @InjectRepository(BranchPhone)
    private readonly branchPhoneRepository: EntityRepository<BranchPhone>,
    @InjectRepository(OrderPivot)
    private readonly orderPivotRepository: EntityRepository<OrderPivot>,
    private readonly orm: MikroORM,
  ) {}

  @UseRequestContext()
  create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const c = this.orm.em.getConnection();
    return c.execute(
      `INSERT INTO branches (city, address, monthly_budget, manager) VALUES ('${createBranchDto.city}', '${createBranchDto.address}', ${createBranchDto.monthlyBudget}, '${createBranchDto.manager}')`,
    );
  }

  @UseRequestContext()
  update(id: number, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    const c = this.orm.em.getConnection();
    return c.execute(
      `UPDATE branches SET city = '${updateBranchDto.city}', address = '${updateBranchDto.address}', monthly_budget = ${updateBranchDto.monthlyBudget}, manager = '${updateBranchDto.manager}'`,
    );
  }

  @UseRequestContext()
  findAll(): Promise<Array<Branch>> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM branches`);
  }

  @UseRequestContext()
  findOne(id: number): Promise<Branch> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM branches WHERE ID = ${id}`);
  }

  @UseRequestContext()
  remove(id: number): Promise<Branch> {
    const c = this.orm.em.getConnection();
    return c.execute(`DELETE FROM branches WHERE ID = ${id}`);
  }

  @UseRequestContext()
  async createPhone(
    branchId: number,
    createBranchPhoneDto: CreateBranchPhoneDto,
  ): Promise<BranchPhone> {
    const branch = await this.findOne(branchId);
    const branchPhone = new BranchPhone(branch, createBranchPhoneDto.number);
    await this.branchPhoneRepository.persistAndFlush(branchPhone);
    return branchPhone;
  }

  @UseRequestContext()
  async updatePhone(
    key: string,
    updateBranchPhoneDto: UpdateBranchPhoneDto,
  ): Promise<BranchPhone> {
    const branchPhone = await this.findOnePhone(key);
    branchPhone.number = updateBranchPhoneDto.number;
    await this.branchPhoneRepository.persistAndFlush(branchPhone);
    return branchPhone;
  }

  @UseRequestContext()
  findAllPhones(branchId: number): Promise<Array<BranchPhone>> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM branche_phones`);
  }

  @UseRequestContext()
  findOnePhone(key: string): Promise<BranchPhone> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM branche_phones WHERE KEY = '${key}'`);
  }

  @UseRequestContext()
  removePhone(key: string): Promise<BranchPhone> {
    const c = this.orm.em.getConnection();
    return c.execute(`DELETE FROM branche_phones WHERE KEY = ${key}`);
  }

  @UseRequestContext()
  async createOrder(
    branchId: number,
    createOrderDto: CreateOrderDto,
  ): Promise<OrderPivot> {
    const branch = await this.findOne(branchId);
    const warehouse = new Warehouse();
    const order = new OrderPivot(
      warehouse,
      branch,
      createOrderDto.typeOfProduct,
      createOrderDto.numberOfProduct,
      createOrderDto.deliveryDate,
    );
    await this.orderPivotRepository.persistAndFlush(order);
    return order;
  }

  @UseRequestContext()
  findAllOrders(branchId: number): Promise<Array<OrderPivot>> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM branch_warehouse_order_pivot`);
  }

  @UseRequestContext()
  findOneOrder(key: string): Promise<OrderPivot> {
    const c = this.orm.em.getConnection();
    return c.execute(
      `SELECT * FROM branch_warehouse_order_pivot WHERE KEY = '${key}'`,
    );
  }
}
