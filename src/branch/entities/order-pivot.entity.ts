import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Branch } from './branch.entity';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';

@Entity({
  tableName: 'branch_warehouse_order_pivot',
})
export class OrderPivot {
  @Property({ primary: true })
  key: string;

  @ManyToOne(() => Branch)
  branch: Branch;

  @ManyToOne(() => Warehouse)
  warehouse: Warehouse;

  @Property()
  typeOfProduct: string;

  @Property()
  numberOfProduct: number;

  @Property({ nullable: true })
  deliveryDate: Date;

  constructor(
    warehouse: Warehouse,
    branch: Branch,
    type: string,
    number: number,
    date: Date,
  ) {
    this.branch = branch;
    this.warehouse = warehouse;
    this.typeOfProduct = type;
    this.numberOfProduct = number;
    this.deliveryDate = date;
    this.key = `${warehouse.id}${branch.id}${type}${number}${date}`;
  }
}
