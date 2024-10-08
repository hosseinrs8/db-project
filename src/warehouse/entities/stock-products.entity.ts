import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Warehouse } from './warehouse.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class StockProducts {
  @Property({ primary: true })
  key: string;

  @Property()
  productName: string;

  @Property()
  availableProductCount: number;

  @ApiProperty({
    type: () => Warehouse,
  })
  @ManyToOne(() => Warehouse)
  warehouse: Warehouse;

  constructor(warehouse: Warehouse, apCount: number, pName: string) {
    this.availableProductCount = apCount;
    this.productName = pName;
    this.warehouse = warehouse;
    this.key = `${warehouse.id}${pName}${apCount}`;
  }
}
