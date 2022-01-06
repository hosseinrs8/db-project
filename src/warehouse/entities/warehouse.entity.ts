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
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    type: () => Factory,
  })
  @ManyToOne(() => Factory)
  factory: Factory;

  @ApiProperty({
    type: () => CentralOffice,
  })
  @ManyToOne(() => CentralOffice)
  centralOffice: CentralOffice;

  @ApiProperty({
    type: () => WarehousePhone,
    isArray: true,
  })
  @OneToMany(() => WarehousePhone, (wp) => wp.warehouse)
  phoneNumbers: Collection<WarehousePhone> = new Collection<WarehousePhone>(
    this,
  );

  @ApiProperty({
    type: () => Product,
    isArray: true,
  })
  @OneToMany(() => Product, (p) => p.warehouse)
  products: Collection<Product> = new Collection<Product>(this);

  @ApiProperty({
    type: () => StockProducts,
    isArray: true,
  })
  @OneToMany(() => StockProducts, (sp) => sp.warehouse)
  stockProducts: Collection<StockProducts> = new Collection<StockProducts>(
    this,
  );
}
