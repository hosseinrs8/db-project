import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Employee } from './employee.entity';

@Entity({
  tableName: 'employee_phones',
})
export class EmployeePhone {
  @Property({ primary: true })
  key: string;

  @ManyToOne(() => Employee)
  employee: Employee;

  @Property()
  number: string;

  constructor(employee: Employee, number: string) {
    this.employee = employee;
    this.number = number;
    this.key = `${employee.id}${number}`;
  }
}
