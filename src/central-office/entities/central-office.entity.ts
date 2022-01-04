import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import { Factory } from '../../factory/entities/factory.entity';
import { GeneralManager } from './general-manager.entity';
import { CentralOfficePhone } from './central-office-phone.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class CentralOffice {
  @PrimaryKey()
  id: number;

  @Property()
  address: string;

  @Property()
  yearlyIncome: number;

  @OneToMany(() => Warehouse, (w) => w.centralOffice)
  warehouses: Collection<Warehouse> = new Collection<Warehouse>(this);

  //todo check typeOfProduct & numberOfProduct fields

  @OneToOne(() => Factory, (f) => f.centralOffice, { owner: true })
  factory: Factory;

  @OneToOne(() => GeneralManager, (gm) => gm.centralOffice, { owner: true })
  generalManager: GeneralManager;

  @OneToMany(() => CentralOfficePhone, (c) => c.centralOffice)
  phoneNumbers: Collection<CentralOfficePhone> = new Collection<CentralOfficePhone>(
    this,
  );

  @OneToMany(() => Employee, (e) => e.centralOffice)
  employees: Collection<Employee> = new Collection<Employee>(this);

  @OneToMany(() => Product, (p) => p.centralOffice)
  products: Collection<Product> = new Collection<Product>(this);
}
