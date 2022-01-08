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
  findOne(id: number) {
    //todo
  }

  @UseRequestContext()
  remove(id: number) {
    //todo
  }

  @UseRequestContext()
  createMicrowave(createMicrowaveDto: CreateMicrowaveDto) {
    //todo
  }

  @UseRequestContext()
  findAllMicrowaves() {
    //todo
  }

  @UseRequestContext()
  createOven(createOvenDto: CreateOvenDto) {
    //todo
  }

  @UseRequestContext()
  findAllOvens() {
    //todo
  }

  @UseRequestContext()
  createRefrigerator(createRefrigeratorDto: CreateRefrigeratorDto) {
    //todo
  }

  @UseRequestContext()
  findAllRefrigerators() {
    //todo
  }

  @UseRequestContext()
  createTv(createTvDto: CreateTvDto) {
    //todo
  }

  @UseRequestContext()
  findAllTvs() {
    //todo
  }

  @UseRequestContext()
  createVacuumCleaner(createVaccumDto: CreateVacuumDto) {
    //todo
  }

  @UseRequestContext()
  findAllVacuumCleaners() {
    //todo
  }

  @UseRequestContext()
  createWashingMachine(createWashingMachineDto: CreateWashingMachineDto) {
    //todo
  }

  @UseRequestContext()
  findAllWashingMachines() {
    //todo
  }
}
