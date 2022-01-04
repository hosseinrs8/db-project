import { Entity, Property } from '@mikro-orm/core';
import { Product } from './product.entity';

@Entity({
  tableName: 'refrigerators',
  discriminatorValue: 'refrigerator',
})
export class Refrigerator extends Product {
  @Property()
  sizeLiter: number;

  @Property()
  sizeFt: number;

  @Property()
  energyConsumption: number;
}
