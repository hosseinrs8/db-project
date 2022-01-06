import { Injectable } from '@nestjs/common';
import { InjectRepository, UseRequestContext } from '@mikro-orm/nestjs';
import { Employee } from './entities/employee.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Supporter } from './entities/supporter.entity';
import { EmployeePhone } from './entities/employee-phone.entity';
import { SupporterPhone } from './entities/supporter-phone.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeePhoneDto } from './dto/create-employee-phone.dto';
import { UpdateEmployeePhoneDto } from './dto/update-employee-phone.dto';
import { MikroORM } from '@mikro-orm/core';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: EntityRepository<Employee>,
    @InjectRepository(EmployeePhone)
    private readonly employeePhoneRepository: EntityRepository<EmployeePhone>,
    @InjectRepository(Supporter)
    private readonly supporterRepository: EntityRepository<Supporter>,
    @InjectRepository(SupporterPhone)
    private readonly supporterPhoneRepository: EntityRepository<Supporter>,
    private readonly orm: MikroORM,
  ) {}

  @UseRequestContext()
  create(createEmployeeDto: CreateEmployeeDto) {
    //todo
  }

  @UseRequestContext()
  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    //todo
  }

  @UseRequestContext()
  findAll() {
    //todo
  }

  @UseRequestContext()
  findOne(type: string, id: number) {
    //todo
  }

  @UseRequestContext()
  remove(type: string, id: number) {
    //todo
  }

  @UseRequestContext()
  createPhone(ownerId: number, createEmployeePhoneDto: CreateEmployeePhoneDto) {
    //todo
  }

  @UseRequestContext()
  updatePhone(key: string, updateEmployeePhoneDto: UpdateEmployeePhoneDto) {
    //todo
  }

  @UseRequestContext()
  findAllPhone(type: string, ownerId: number) {
    //todo
  }

  @UseRequestContext()
  findOnePhone(type: string, key: string) {
    //todo
  }

  @UseRequestContext()
  removePhone(type: string, key: string) {
    //todo
  }
}
