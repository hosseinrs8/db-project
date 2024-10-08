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
import { Ticket } from '../../ticket/entities/ticket.entity';
import { Employee, Responsibility } from './employee.entity';
import { CentralOffice } from '../../central-office/entities/central-office.entity';
import { SupporterPhone } from './supporter-phone.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum Speciality {
  sell = 'sell',
  install = 'install',
  guarantee = 'guarantee',
}

@Entity({
  tableName: 'supporters',
})
export class Supporter {
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

  @Enum(() => Speciality)
  speciality: Speciality;

  @ApiProperty({
    type: () => Employee,
  })
  @OneToOne(() => Employee, (e) => e.supporter, { owner: true })
  employee: Employee;

  @ApiProperty({
    type: () => Ticket,
  })
  @OneToOne(() => Ticket, (t) => t.supporter, { owner: true })
  ticket: Ticket;

  @ApiProperty({
    type: () => CentralOffice,
  })
  @ManyToOne(() => CentralOffice)
  centralOffice: CentralOffice;

  @ApiProperty({
    type: () => SupporterPhone,
    isArray: true,
  })
  @OneToMany(() => SupporterPhone, (sp) => sp.supporter)
  phoneNumbers: Collection<SupporterPhone> = new Collection<SupporterPhone>(
    this,
  );
}
