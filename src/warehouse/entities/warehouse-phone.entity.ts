import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Warehouse } from './warehouse.entity';

@Entity({
  tableName: 'warehouse_phones',
})
export class WarehousePhone {
  @Property({ primary: true })
  key: string;

  @ManyToOne(() => Warehouse)
  warehouse: Warehouse;

  @Property()
  number: string;

  constructor(warehouse: Warehouse, number: string) {
    this.warehouse = warehouse;
    this.number = number;
    this.key = `${warehouse.id}${number}`;
  }
}
