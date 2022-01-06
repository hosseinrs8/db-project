import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Employee } from './employee.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  tableName: 'employee_phones',
})
export class EmployeePhone {
  @Property({ primary: true })
  key: string;

  @ApiProperty({
    type: () => Employee,
  })
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
