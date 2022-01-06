import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CentralOffice } from './entities/central-office.entity';
import { InjectRepository, UseRequestContext } from '@mikro-orm/nestjs';

@Injectable()
export class CentralOfficeService {
  constructor(
    @InjectRepository(CentralOffice)
    private readonly centralOfficeRepository: EntityRepository<CentralOffice>,
  ) {}
  async onModuleInit(): Promise<void> {
    //todo seed centralOffice, generalManager
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
