import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CentralOffice } from '../../central-office/entities/central-office.entity';
import { Factory } from '../../factory/entities/factory.entity';
import { StockProducts } from './stock-products.entity';
import { WarehousePhone } from './warehouse-phone.entity';
import { Product } from '../../product/entities/product.entity';

@Entity({
  tableName: 'warehouses',
})
export class Warehouse {
  @PrimaryKey()
  id: number;

  @Property()
  foreman: string;

  @Property()
  city: string;

  @Property()
  address: string;

  @Property()
  monthlyBudget: number;

  //todo typeOfProduct and numberOfProduct fields

  @ManyToOne(() => Factory)
  factory: Factory;

  @ManyToOne(() => CentralOffice)
  centralOffice: CentralOffice;

  @OneToMany(() => WarehousePhone, (wp) => wp.warehouse)
  phoneNumbers: Collection<WarehousePhone> = new Collection<WarehousePhone>(
    this,
  );

  @OneToMany(() => Product, (p) => p.warehouse)
  products: Collection<Product> = new Collection<Product>(this);

  @OneToMany(() => StockProducts, (sp) => sp.warehouse)
  stockProducts: Collection<StockProducts> = new Collection<StockProducts>(
    this,
  );
}
