import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository, UseRequestContext } from '@mikro-orm/nestjs';
import { Employee, Responsibility } from './entities/employee.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Supporter } from './entities/supporter.entity';
import { EmployeePhone } from './entities/employee-phone.entity';
import { SupporterPhone } from './entities/supporter-phone.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeePhoneDto } from './dto/create-employee-phone.dto';
import { UpdateEmployeePhoneDto } from './dto/update-employee-phone.dto';
import { MikroORM } from '@mikro-orm/core';

export type EmSup = Employee | Supporter;
export type EmSupPhone = EmployeePhone | SupporterPhone;

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
    private readonly supporterPhoneRepository: EntityRepository<SupporterPhone>,
    private readonly orm: MikroORM,
  ) {}

  @UseRequestContext()
  create(createEmployeeDto: CreateEmployeeDto): Promise<EmSup> {
    const c = this.orm.em.getConnection();
    if (
      createEmployeeDto.responsibility === Responsibility.supporter ||
      createEmployeeDto.speciality
    ) {
      return c.execute(
        `INSERT INTO supporters (id_number, responsibility, address, hourly_salary, name, hours_worked, speciality) VALUES (${createEmployeeDto.idNumber}, '${createEmployeeDto.responsibility}', '${createEmployeeDto.address}', ${createEmployeeDto.hourlySalary}, '${createEmployeeDto.name}', ${createEmployeeDto.hoursWorked}, '${createEmployeeDto.speciality}')`,
      );
    } else {
      return c.execute(
        `INSERT INTO employees (id_number, responsibility, address, hourly_salary, name, hours_worked) VALUES (${createEmployeeDto.idNumber}, '${createEmployeeDto.responsibility}', '${createEmployeeDto.address}', ${createEmployeeDto.hourlySalary}, '${createEmployeeDto.name}', ${createEmployeeDto.hoursWorked})`,
      );
    }
  }

  @UseRequestContext()
  update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<EmSup> {
    const c = this.orm.em.getConnection();
    if (updateEmployeeDto.isSupporter) {
      return c.execute(
        `UPDATE supporters SET id_number = ${updateEmployeeDto.idNumber}, responsibility = '${updateEmployeeDto.responsibility}', address = '${updateEmployeeDto.address}', hourly_salary = ${updateEmployeeDto.hourlySalary}, name = '${updateEmployeeDto.name}', hours_worked = ${updateEmployeeDto.hoursWorked}, speciality = '${updateEmployeeDto.speciality}' WHERE ID = '${id}'`,
      );
    } else {
      return c.execute(
        `UPDATE employees SET id_number = ${updateEmployeeDto.idNumber}, responsibility = '${updateEmployeeDto.responsibility}', address = '${updateEmployeeDto.address}', hourly_salary = ${updateEmployeeDto.hourlySalary}, name = '${updateEmployeeDto.name}', hours_worked = ${updateEmployeeDto.hoursWorked} WHERE ID = '${id}'`,
      );
    }
  }

  @UseRequestContext()
  async findAll(): Promise<Array<EmSup>> {
    const c = this.orm.em.getConnection();
    const result = new Array<EmSup>();
    const employees: Array<Employee> = await c.execute(
      `SELECT * FROM employees`,
    );
    const supporters: Array<Supporter> = await c.execute(
      `SELECT * FROM supporters`,
    );
    result.push(...employees);
    result.push(...supporters);
    return result;
  }

  @UseRequestContext()
  findOne(type: string, id: number): Promise<EmSup> {
    const c = this.orm.em.getConnection();
    if (type === 'supporter') {
      return c.execute(`SELECT * FROM supporters WHERE ID = '${id}'`);
    } else if (type === 'employee') {
      return c.execute(`SELECT * FROM employees WHERE ID = '${id}'`);
    } else {
      throw new BadRequestException();
    }
  }

  @UseRequestContext()
  remove(type: string, id: number): Promise<EmSup> {
    const c = this.orm.em.getConnection();
    if (type === 'supporter') {
      return c.execute(`DELETE FROM supporters WHERE ID = '${id}'`);
    } else if (type === 'employee') {
      return c.execute(`DELETE FROM employees WHERE ID = '${id}'`);
    } else {
      throw new BadRequestException();
    }
  }

  @UseRequestContext()
  async createPhone(
    ownerId: number,
    createEmployeePhoneDto: CreateEmployeePhoneDto,
  ): Promise<EmSupPhone> {
    if (createEmployeePhoneDto.isSupporter) {
      const supporter = await this.supporterRepository.findOne(
        { id: ownerId },
        ['phoneNumbers'],
      );
      const phone = new SupporterPhone(
        supporter,
        createEmployeePhoneDto.number,
      );
      const qb = this.supporterPhoneRepository.createQueryBuilder();
      await qb.insert(phone).execute('get');
      return phone;
    } else {
      const employee = await this.employeeRepository.findOne({ id: ownerId }, [
        'phoneNumbers',
      ]);
      const phone = new EmployeePhone(employee, createEmployeePhoneDto.number);
      const qb = this.employeePhoneRepository.createQueryBuilder();
      await qb.insert(phone).execute('get');
      return phone;
    }
  }

  @UseRequestContext()
  async updatePhone(
    key: string,
    updateEmployeePhoneDto: UpdateEmployeePhoneDto,
  ): Promise<EmSupPhone> {
    if (updateEmployeePhoneDto.isSupporter) {
      const qb = this.supporterPhoneRepository.createQueryBuilder();
      const phone = await this.findOnePhone('supporter', key);
      phone.number = updateEmployeePhoneDto.number || phone.number;
      await qb.update(phone).execute('get');
      return phone;
    } else {
      const qb = this.employeePhoneRepository.createQueryBuilder();
      const phone = await this.findOnePhone('employee', key);
      phone.number = updateEmployeePhoneDto.number || phone.number;
      await qb.update(phone).execute('get');
      return phone;
    }
  }

  @UseRequestContext()
  findAllPhone(type: string, ownerId: number): Promise<Array<EmSupPhone>> {
    if (type === 'supporter') {
      const qb = this.supporterPhoneRepository.createQueryBuilder();
      return qb.select('*').where({ customer: ownerId }).execute('all');
    } else if (type === 'employee') {
      const qb = this.employeePhoneRepository.createQueryBuilder();
      return qb.select('*').where({ customer: ownerId }).execute('all');
    } else {
      throw new BadRequestException();
    }
  }

  @UseRequestContext()
  findOnePhone(type: string, key: string): Promise<EmSupPhone> {
    const c = this.orm.em.getConnection();
    if (type === 'supporter') {
      return c.execute(`SELECT * FROM supporter_phones WHERE KEY = '${key}'`);
    } else if (type === 'employee') {
      return c.execute(`SELECT * FROM employee_phones WHERE KEY = '${key}'`);
    } else {
      throw new BadRequestException();
    }
  }

  @UseRequestContext()
  removePhone(type: string, key: string): Promise<EmSupPhone> {
    const c = this.orm.em.getConnection();
    if (type === 'supporter') {
      return c.execute(`DELETE FROM supporter_phones WHERE KEY = '${key}'`);
    } else if (type === 'employee') {
      return c.execute(`DELETE FROM employee_phones WHERE KEY = '${key}'`);
    } else {
      throw new BadRequestException();
    }
  }
}
