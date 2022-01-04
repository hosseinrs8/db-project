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

  @Property({ nullable: true })
  isSupporter: boolean;

  @OneToOne(() => Supporter, (s) => s.employee, { nullable: true })
  supporter: Supporter | null;

  @ManyToOne(() => CentralOffice)
  centralOffice: CentralOffice;

  @OneToMany(() => EmployeePhone, (ep) => ep.employee)
  phoneNumbers: Collection<EmployeePhone> = new Collection<EmployeePhone>(this);
}
