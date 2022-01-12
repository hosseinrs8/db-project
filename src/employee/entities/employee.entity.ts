import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CentralOffice } from '../../central-office/entities/central-office.entity';
import { EmployeePhone } from './employee-phone.entity';
import { Supporter } from './supporter.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum Responsibility {
  supporter = 'supporter',
  salesOffice = 'salesOffice',
  //todo
}

@Entity({
  tableName: 'employees',
})
export class Employee {
  @PrimaryKey()
  id: number;

  @Property()
  idNumber: number;

  @Enum(() => Responsibility)
  responsibility: Responsibility;

  @Property()
  address: string;

  @Property()
  hourlySalary: number;

  @Property()
  name: string;

  @Property()
  hoursWorked: number;

  @ApiProperty({
    type: () => Supporter,
  })
  @OneToOne(() => Supporter, (s) => s.employee, { nullable: true })
  supporter: Supporter | null;

  @ApiProperty({
    type: () => CentralOffice,
  })
  @ManyToOne(() => CentralOffice, { nullable: true }) //todo remove nullable
  centralOffice: CentralOffice;

  @ApiProperty({
    type: () => EmployeePhone,
    isArray: true,
  })
  @OneToMany(() => EmployeePhone, (ep) => ep.employee)
  phoneNumbers: Collection<EmployeePhone> = new Collection<EmployeePhone>(this);
}
