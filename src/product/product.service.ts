import { Injectable } from '@nestjs/common';
import { InjectRepository, UseRequestContext } from '@mikro-orm/nestjs';
import { Microwave } from './entities/microwave.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Oven } from './entities/oven.entity';
import { Product } from './entities/product.entity';
import { Refrigerator } from './entities/refrigerator.entity';
import { Tv } from './entities/tv.entity';
import { VacuumCleaner } from './entities/vacuum-cleaner.entity';
import { WashingMachine } from './entities/washing-machine.entity';
import { MikroORM } from '@mikro-orm/core';
import { CreateMicrowaveDto } from './dto/create-microwave.dto';
import { CreateOvenDto } from './dto/create-oven.dto';
import { CreateRefrigeratorDto } from './dto/create-refrigerator.dto';
import { CreateTvDto } from './dto/create-tv.dto';
import { CreateVacuumDto } from './dto/create-vacuum.dto';
import { CreateWashingMachineDto } from './dto/create-washing-machine.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Tv)
    private readonly tvRepository: EntityRepository<Tv>,
    @InjectRepository(Oven)
    private readonly ovenRepository: EntityRepository<Oven>,
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
    @InjectRepository(Microwave)
    private readonly microwaveRepository: EntityRepository<Microwave>,
    @InjectRepository(Refrigerator)
    private readonly refrigeratorRepository: EntityRepository<Refrigerator>,
    @InjectRepository(VacuumCleaner)
    private readonly vacuumCleanerRepository: EntityRepository<VacuumCleaner>,
    @InjectRepository(WashingMachine)
    private readonly washingMachineRepository: EntityRepository<WashingMachine>,
    private readonly orm: MikroORM,
  ) {}

  @UseRequestContext()
  findOne(id: number): Promise<Product> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM products WHERE ID = ${ id }`);
  }

  @UseRequestContext()
  remove(id: number): Promise<Product> {
    const c = this.orm.em.getConnection();
    return c.execute(`DELETE FROM products WHERE ID = ${ id }`);
  }

  @UseRequestContext()
  createMicrowave(createMicrowaveDto: CreateMicrowaveDto): Promise<Microwave> {
    const c = this.orm.em.getConnection();
    return c.execute(
        `INSERT INTO products (type, model, color, warranty, price, central_office_id, warehouse_id, factory_id, capacity, energy_consumption) VALUES ('${createMicrowaveDto.type}', '${createMicrowaveDto.model}', '${createMicrowaveDto.color}', ${createMicrowaveDto.warranty}, ${createMicrowaveDto.price}, ${createMicrowaveDto.centralOfficeId}, ${createMicrowaveDto.warehouseId}, ${createMicrowaveDto.factoryId}, ${createMicrowaveDto.capacity}, ${createMicrowaveDto.energyConsumption})`,
    );
  }

  @UseRequestContext()
  findAllMicrowaves(): Promise<Array<Microwave>> {
    const c = this.orm.em.getConnection();
    const qb = this.microwaveRepository.createQueryBuilder();
    return qb.select('*').execute('all');
  }

  @UseRequestContext()
  createOven(createOvenDto: CreateOvenDto): Promise<Oven> {
    const c = this.orm.em.getConnection();
    return c.execute(
        `INSERT INTO products (type, model, color, warranty, price, central_office_id, warehouse_id, factory_id, capacity) VALUES ('${createOvenDto.type}', '${createOvenDto.model}', '${createOvenDto.color}', ${createOvenDto.warranty}, ${createOvenDto.price}, ${createOvenDto.centralOfficeId}, ${createOvenDto.warehouseId}, ${createOvenDto.factoryId}, ${createOvenDto.capacity})`,
    );
  }

  @UseRequestContext()
  findAllOvens(): Promise<Array<Oven>> {
    const c = this.orm.em.getConnection();
    const qb = this.ovenRepository.createQueryBuilder();
    return qb.select('*').execute('all');
  }

  @UseRequestContext()
  createRefrigerator(createRefrigeratorDto: CreateRefrigeratorDto): Promise<Refrigerator> {
    const c = this.orm.em.getConnection();
    return c.execute(
        `INSERT INTO products (type, model, color, warranty, price, central_office_id, warehouse_id, factory_id, size_liter, size_ft, energy_consumption) VALUES ('${createRefrigeratorDto.type}', '${createRefrigeratorDto.model}', '${createRefrigeratorDto.color}', ${createRefrigeratorDto.warranty}, ${createRefrigeratorDto.price}, ${createRefrigeratorDto.centralOfficeId}, ${createRefrigeratorDto.warehouseId}, ${createRefrigeratorDto.factoryId}, ${createRefrigeratorDto.sizeLiter}, ${createRefrigeratorDto.sizeFt}, ${createRefrigeratorDto.energyConsumption})`,
    );
  }

  @UseRequestContext()
  findAllRefrigerators(): Promise<Array<Refrigerator>> {
    const c = this.orm.em.getConnection();
    const qb = this.refrigeratorRepository.createQueryBuilder();
    return qb.select('*').execute('all');
  }

  @UseRequestContext()
  createTv(createTvDto: CreateTvDto): Promise<Tv> {
    const c = this.orm.em.getConnection();
    return c.execute(
        `INSERT INTO products (type, model, color, warranty, price, central_office_id, warehouse_id, factory_id, image_resolution, sound_resolution, energy_consumption, os, size_in) VALUES ('${createTvDto.type}', '${createTvDto.model}', '${createTvDto.color}', ${createTvDto.warranty}, ${createTvDto.price}, ${createTvDto.centralOfficeId}, ${createTvDto.warehouseId}, ${createTvDto.factoryId}, ${createTvDto.imageResolution}, ${createTvDto.soundResolution}, ${createTvDto.energyConsumption}, '${createTvDto.os}', ${createTvDto.sizeIn})`,
    );
  }

  @UseRequestContext()
  findAllTvs(): Promise<Array<Tv>> {
    const c = this.orm.em.getConnection();
    const qb = this.tvRepository.createQueryBuilder();
    return qb.select('*').execute('all');
  }

  @UseRequestContext()
  createVacuumCleaner(createVaccumDto: CreateVacuumDto): Promise<VacuumCleaner> {
    const c = this.orm.em.getConnection();
    return c.execute(
        `INSERT INTO products (type, model, color, warranty, price, central_office_id, warehouse_id, factory_id, capacity, energy_consumption) VALUES ('${createVaccumDto.type}', '${createVaccumDto.model}', '${createVaccumDto.color}', ${createVaccumDto.warranty}, ${createVaccumDto.price}, ${createVaccumDto.centralOfficeId}, ${createVaccumDto.warehouseId}, ${createVaccumDto.factoryId}, ${createVaccumDto.capacity}, ${createVaccumDto.energyConsumption})`,
    );
  }

  @UseRequestContext()
  findAllVacuumCleaners(): Promise<Array<VacuumCleaner>> {
    const c = this.orm.em.getConnection();
    const qb = this.vacuumCleanerRepository.createQueryBuilder();
    return qb.select('*').execute('all');
  }

  @UseRequestContext()
  createWashingMachine(createWashingMachineDto: CreateWashingMachineDto): Promise<WashingMachine> {
    const c = this.orm.em.getConnection();
    return c.execute(
        `INSERT INTO products (type, model, color, warranty, price, central_office_id, warehouse_id, factory_id, size_kg, energy_consumption) VALUES ('${createWashingMachineDto.type}', '${createWashingMachineDto.model}', '${createWashingMachineDto.color}', ${createWashingMachineDto.warranty}, ${createWashingMachineDto.price}, ${createWashingMachineDto.centralOfficeId}, ${createWashingMachineDto.warehouseId}, ${createWashingMachineDto.factoryId}, ${createWashingMachineDto.sizeKg}, ${createWashingMachineDto.energyConsumption})`,
    )
  }

  @UseRequestContext()
  findAllWashingMachines(): Promise<Array<WashingMachine>> {
    const c = this.orm.em.getConnection();
    const qb = this.washingMachineRepository.createQueryBuilder();
    return qb.select('*').execute('all');
  }
}
