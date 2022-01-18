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

  update(id: number, updateFactoryDto: UpdateFactoryDto): Promise<Factory> {
    const c = this.orm.em.getConnection();
    return c.execute(`UPDATE factory SET ceo = '${updateFactoryDto.ceo}', address = '${updateFactoryDto.address}' WHERE ID = ${id}`);
  }

  async createPhone(ownerId: number, createFactoryPhoneDto: CreateFactoryPhoneDto): Promise<FactoryPhone> { //todo: I add ownerId to arguments
    const factory = await this.factoryRepository.findOne(
          { id: ownerId},
          ['phoneNumbers'],
      );
      const phone = new FactoryPhone(
          factory,
          createFactoryPhoneDto.number,
      );
      const qb = this.factoryPhoneRepository.createQueryBuilder();
      await qb.insert(phone).execute('get');
      return phone;
    }

  async updatePhone(key: string, updateFactoryPhone: UpdateFactoryPhoneDto): Promise<FactoryPhone> {
    const qb = this.factoryPhoneRepository.createQueryBuilder();
    const phone = await this.findOnePhone(key);
    phone.number = updateFactoryPhone.number || phone.number;
    await qb.update(phone).execute('get');
    return phone;
  }

  removePhone(key: string): Promise<FactoryPhone> {
    const c = this.orm.em.getConnection();
    return c.execute(`DELETE FROM factory_phones WHERE KEY = '${ key }'`);
  }

  @UseRequestContext()
  find(): Promise<Array<Factory>> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM factory`);
  }


  @UseRequestContext()
  findOnePhone(key: string): Promise<FactoryPhone> { //todo: I add this scope
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM factory_phones WHERE KEY = '${key}'`);
  }

  @UseRequestContext()
  findPhones(): Promise<Array<FactoryPhone>> {
    const c = this.orm.em.getConnection();
    return c.execute(`SELECT * FROM factory_phones`);
  }
}
