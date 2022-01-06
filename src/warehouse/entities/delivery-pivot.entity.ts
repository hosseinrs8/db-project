import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Branch } from '../../branch/entities/branch.entity';
import { Warehouse } from './warehouse.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  tableName: 'warehouse_branch_delivery_pivot',
})
export class DeliveryPivot {
  @Property({ primary: true })
  key: string;

  @ApiProperty({
    type: () => Branch,
  })
  @ManyToOne(() => Branch)
  branch: Branch;

  @ApiProperty({
    type: () => Warehouse,
  })
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
