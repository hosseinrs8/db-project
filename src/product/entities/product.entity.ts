import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import { CentralOffice } from '../../central-office/entities/central-office.entity';
import { Factory } from '../../factory/entities/factory.entity';

@Entity({
  tableName: 'products',
  discriminatorColumn: 'discr',
  discriminatorValue: 'product',
})
export class Product {
  @PrimaryKey()
  id: number;

  @Property()
  type: string;

  @Property()
  model: string;

  @Property()
  color: string;

  @Property()
  warranty: Date;

  @Property()
  price: number;

  @Property()
  dateManufactured: Date;

  @ManyToOne(() => Invoice)
  invoice: Invoice;

  @ManyToOne(() => Warehouse)
  warehouse: Warehouse;

  @ManyToOne(() => CentralOffice)
  centralOffice: CentralOffice;

  @ManyToOne(() => Factory)
  factory: Factory;
}
