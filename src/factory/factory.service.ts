import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Factory } from './entities/factory.entity';
import { InjectRepository, UseRequestContext } from '@mikro-orm/nestjs';
import { FactoryPhone } from './entities/factory-phone.entity';
import { MikroORM } from '@mikro-orm/core';

@Injectable()
export class FactoryService {
  constructor(
    @InjectRepository(Factory)
    private readonly factoryRepository: EntityRepository<Factory>,
    @InjectRepository(FactoryPhone)
    private readonly factoryPhoneRepository: EntityRepository<FactoryPhone>,
    private readonly orm: MikroORM,
  ) {}

  async onModuleInit(): Promise<void> {
    //todo seed factory
  }

  @UseRequestContext()
  find() {
    //todo
  }

  @UseRequestContext()
  findPhones() {
    //todo
  }
}
