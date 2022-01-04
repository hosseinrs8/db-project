import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { CentralOffice } from './central-office.entity';
import { GeneralManagerPhone } from './general-manager-phone.entity';

@Entity()
export class GeneralManager {
  @Property({ primary: true })
  key: string;

  @Property()
  idNumber: string;

  @OneToOne(() => CentralOffice, (co) => co.generalManager)
  centralOffice: CentralOffice;

  @Property()
  hoursWorked: number;

  @Property()
  name: string;

  @Property()
  hourlySalary: number;

  @OneToMany(() => GeneralManagerPhone, (g) => g.generalManager)
  phoneNumbers: Collection<GeneralManagerPhone> = new Collection<GeneralManagerPhone>(
    this,
  );

  constructor(centralOffice: CentralOffice, id: string) {
    this.idNumber = id;
    this.centralOffice = centralOffice;
    this.key = `${centralOffice.id}${id}`;
  }
}
