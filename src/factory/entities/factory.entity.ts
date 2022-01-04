import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CentralOffice } from '../../central-office/entities/central-office.entity';
import { FactoryPhone } from './factory-phone.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Factory {
  @PrimaryKey()
  id: number;

  @Property()
  ceo: string;

  @Property()
  address: string;

  @OneToOne(() => CentralOffice, (co) => co.factory)
  centralOffice: CentralOffice;

  @OneToMany(() => FactoryPhone, (f) => f.factory)
  phoneNumbers: Collection<FactoryPhone> = new Collection<FactoryPhone>(this);

  @OneToMany(() => Product, (p) => p.factory)
  manufacturedProducts: Collection<Product> = new Collection<Product>(this);
}
