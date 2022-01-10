import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CentralOffice } from './entities/central-office.entity';
import { InjectRepository, UseRequestContext } from '@mikro-orm/nestjs';
import { UpdateCentralOfficeDto } from './dto/update-central-office.dto';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { UpdateGeneralManagerDto } from './dto/update-general-manager.dto';
import { GeneralManager } from './entities/general-manager.entity';
import { GeneralManagerPhone } from './entities/general-manager-phone.entity';
import { CentralOfficePhone } from './entities/central-office-phone.entity';
import { MikroORM } from '@mikro-orm/core';

@Injectable()
export class CentralOfficeService {
  constructor(
    @InjectRepository(CentralOffice)
    private readonly centralOfficeRepository: EntityRepository<CentralOffice>,
    @InjectRepository(GeneralManager)
    private readonly generalManagerRepository: EntityRepository<GeneralManager>,
    @InjectRepository(CentralOfficePhone)
    private readonly centralOfficePhoneRepository: EntityRepository<CentralOfficePhone>,
    @InjectRepository(GeneralManagerPhone)
    private readonly generalManagerPhoneRepository: EntityRepository<GeneralManagerPhone>,
    private readonly orm: MikroORM,
  ) {}
  async onModuleInit(): Promise<void> {
    //todo seed centralOffice, generalManager
  }

  @UseRequestContext()
  update(id: number, updateCentralOfficeDto: UpdateCentralOfficeDto) {
    //todo
  }

  @UseRequestContext()
  updateManager(id: number, updateGeneralManagerDro: UpdateGeneralManagerDto) {
    //todo
  }

  @UseRequestContext()
  createPhone(createPhoneDto: CreatePhoneDto) {
    //todo
  }

  @UseRequestContext()
  updatePhone(key: string, updatePhoneDto: UpdatePhoneDto) {
    //todo
  }

  @UseRequestContext()
  removePhone(key: string) {
    //todo
  }

  @UseRequestContext()
  find() {
    //todo
  }

  @UseRequestContext()
  findManager() {
    //todo
  }

  @UseRequestContext()
  findPhones() {
    //todo
  }

  @UseRequestContext()
  findManagerPhones() {
    //todo
  }
}
