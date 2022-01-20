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

  @OneToMany(() => Warehouse, (w) => w.centralOffice, { nullable: true })
  warehouses: Collection<Warehouse> = new Collection<Warehouse>(this);

  @OneToOne(() => Factory, (f) => f.centralOffice, {
    owner: true,
    nullable: true,
  })
  factory: Factory;

  @OneToOne(() => GeneralManager, (gm) => gm.centralOffice, { owner: true })
  generalManager: GeneralManager;

  @OneToMany(() => CentralOfficePhone, (c) => c.centralOffice, {
    nullable: true,
  })
  phoneNumbers: Collection<CentralOfficePhone> = new Collection<CentralOfficePhone>(
    this,
  );

  @OneToMany(() => Employee, (e) => e.centralOffice, { nullable: true })
  employees: Collection<Employee> = new Collection<Employee>(this);

  @OneToMany(() => Product, (p) => p.centralOffice, { nullable: true })
  products: Collection<Product> = new Collection<Product>(this);
}
