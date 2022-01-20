import { Injectable, BadRequestException } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CentralOffice } from './entities/central-office.entity';
import { InjectRepository, UseRequestContext } from '@mikro-orm/nestjs';
import { UpdateCentralOfficeDto } from './dto/update-central-office.dto';
import { CreatePhoneDto, PhoneOwners } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { UpdateGeneralManagerDto } from './dto/update-general-manager.dto';
import { GeneralManager } from './entities/general-manager.entity';
import { GeneralManagerPhone } from './entities/general-manager-phone.entity';
import { CentralOfficePhone } from './entities/central-office-phone.entity';
import { MikroORM } from '@mikro-orm/core';

export type Phone = CentralOfficePhone | GeneralManagerPhone;

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
    if ((await this.find()).length < 1) {
      const co = new CentralOffice();
      co.address = 'Tehran';
      co.yearlyIncome = 1000;
      this.centralOfficeRepository.persist(co);
      const manager = new GeneralManager(co, 123);
      manager.name = 'name';
      manager.hourlySalary = 100;
      await this.generalManagerRepository.persistAndFlush(manager);
      co.generalManager = manager;
      await this.centralOfficeRepository.persistAndFlush(co);
    }
  }

  @UseRequestContext()
  update(
    id: number,
    updateCentralOfficeDto: UpdateCentralOfficeDto,
  ): Promise<CentralOffice> {
    const c = this.orm.em.getConnection();
    return c.execute(
      `UPDATE central_office SET address = '${updateCentralOfficeDto.address}', yearly_income = '${updateCentralOfficeDto.yearlyIncome}' WHERE ID = ${id}`,
    );
  }

  @UseRequestContext()
  updateManager(
    id: number,
    updateGeneralManagerDro: UpdateGeneralManagerDto,
  ): Promise<GeneralManager> {
    const c = this.orm.em.getConnection();
    return c.execute(
      `UPDATE general_manager SET number = '${updateGeneralManagerDro.number}', hours_worked = ${updateGeneralManagerDro.hoursWorked}, name = '${updateGeneralManagerDro.name}', hourly_salary = ${updateGeneralManagerDro.hourlySalary} WHERE ID = ${id}`,
    );
  }

  @UseRequestContext()
  createPhone(createPhoneDto: CreatePhoneDto): Promise<CentralOfficePhone> {
    const c = this.orm.em.getConnection();
    if (createPhoneDto.owner === PhoneOwners.centralOffice) {
      return c.execute(
        `INSERT INTO central_office_phones (owner, number) VALUES (${createPhoneDto.owner}, '${createPhoneDto.number}')`,
      );
    } else if (createPhoneDto.owner === PhoneOwners.generalManager) {
      return c.execute(
        `INSERT INTO general_manager_phones (owner, number) VALUES (${createPhoneDto.owner}, '${createPhoneDto.number}')`,
      );
    } else {
      throw BadRequestException;
    }
  }

  @UseRequestContext()
  updatePhone(
    key: string,
    owner: PhoneOwners,
    updatePhoneDto: UpdatePhoneDto,
  ): Promise<Phone> {
    const c = this.orm.em.getConnection();
    if (owner === PhoneOwners.centralOffice) {
      return c.execute(
        `UPDATE central_office_phones SET number = '${updatePhoneDto.number}' WHERE KEY = '${key}'`,
      );
    } else if (owner === PhoneOwners.generalManager) {
      return c.execute(
        `UPDATE general_manager_phones SET number = '${updatePhoneDto.number}' WHERE KEY = '${key}'`,
      );
    } else {
      throw BadRequestException;
    }
  }

  @UseRequestContext()
  removePhone(key: string, owner: PhoneOwners): Promise<Phone> {
    const c = this.orm.em.getConnection();
    if (owner === PhoneOwners.centralOffice) {
      return c.execute(
        `DELETE FROM central_office_phones WHERE KEY = '${key}'`,
      );
    } else if (owner === PhoneOwners.generalManager) {
      return c.execute(
        `DELETE FROM general_manager_phones  WHERE KEY = '${key}'`,
      );
    } else {
      throw BadRequestException;
    }
  }

  @UseRequestContext()
  find(): Promise<Array<CentralOffice>> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM central_office`);
  }

  @UseRequestContext()
  findManager(): Promise<Array<GeneralManager>> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM general_manager`);
  }

  @UseRequestContext()
  findPhones(): Promise<Array<CentralOfficePhone>> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM central_office_phones`);
  }

  @UseRequestContext()
  findManagerPhones(): Promise<Array<GeneralManagerPhone>> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM general_manager_phones`);
  }
}
