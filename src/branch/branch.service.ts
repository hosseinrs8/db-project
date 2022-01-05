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
  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const branch = new Branch();
    branch.city = createBranchDto.city;
    branch.address = createBranchDto.address;
    branch.manager = createBranchDto.manager;
    // branch.centralOffice = new CentralOffice(); //fixme
    branch.monthlyBudget = createBranchDto.monthlyBudget;
    await this.branchRepository.persistAndFlush(branch);
    return branch;
  }

  @UseRequestContext()
  async update(id: number, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    const branch = await this.findOne(id);
    branch.city = updateBranchDto.city || branch.city;
    branch.address = updateBranchDto.address || branch.address;
    branch.manager = updateBranchDto.manager || branch.manager;
    branch.monthlyBudget =
      updateBranchDto.monthlyBudget || branch.monthlyBudget;
    await this.branchRepository.persistAndFlush(branch);
    return branch;
  }

  @UseRequestContext()
  findAll(): Promise<Array<Branch>> {
    return this.branchRepository.findAll();
  }

  @UseRequestContext()
  findOne(id: number): Promise<Branch> {
    return this.branchRepository.findOne({ id });
  }

  @UseRequestContext()
  async remove(id: number) {
    const branch = await this.findOne(id);
    return this.branchRepository.removeAndFlush(branch);
  }

  @UseRequestContext()
  async createPhone(
    branchId: number,
    createBranchPhoneDto: CreateBranchPhoneDto,
  ) {
    const branch = await this.findOne(branchId);
    const branchPhone = new BranchPhone(branch, createBranchPhoneDto.number);
    await this.branchPhoneRepository.persistAndFlush(branchPhone);
    return branchPhone;
  }

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
    return this.branchPhoneRepository.find({ branch: branchId });
  }

  @UseRequestContext()
  findOnePhone(key: string): Promise<BranchPhone> {
    return this.branchPhoneRepository.findOne({ key });
  }

  @UseRequestContext()
  async removePhone(key: string) {
    const branchPhone = await this.findOnePhone(key);
    return this.branchPhoneRepository.removeAndFlush(branchPhone);
  }

  @UseRequestContext()
  async createOrder(
    branchId: number,
    createOrderDto: CreateOrderDto,
  ): Promise<OrderPivot> {
    const branch = await this.findOne(branchId);
    const warehouse = new Warehouse(); //todo get from warehouseService
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
    return this.orderPivotRepository.find({ branch: branchId });
  }

  @UseRequestContext()
  findOneOrder(key: string): Promise<OrderPivot> {
    return this.orderPivotRepository.findOne({ key });
  }
}
