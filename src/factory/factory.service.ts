import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Factory } from './entities/factory.entity';
import { InjectRepository, UseRequestContext } from '@mikro-orm/nestjs';
import { FactoryPhone } from './entities/factory-phone.entity';
import { MikroORM } from '@mikro-orm/core';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import { CreateFactoryPhoneDto } from './dto/create-factory-phone.dto';
import { UpdateFactoryPhoneDto } from './dto/update-factory-phone.dto';

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

  update(id: number, updateFactoryDto: UpdateFactoryDto) {
    //todo
  }

  createPhone(createFactoryPhoneDto: CreateFactoryPhoneDto) {
    //todo
  }

  updatePhone(key: string, updateFactoryPhone: UpdateFactoryPhoneDto) {
    //todo
  }

  removePhone(key: string) {
    //todo
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
