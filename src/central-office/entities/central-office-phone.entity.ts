import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { CentralOffice } from './central-office.entity';

@Entity({
  tableName: 'central_office_phones',
})
export class CentralOfficePhone {
  @Property({ primary: true })
  key: string;

  @ManyToOne(() => CentralOffice)
  centralOffice: CentralOffice;

  @Property()
  number: string;

  constructor(centralOffice: CentralOffice, number: string) {
    this.centralOffice = centralOffice;
    this.number = number;
    this.key = `${centralOffice.id}${number}`;
  }
}
