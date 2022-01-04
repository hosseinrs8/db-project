import { Entity, Property } from '@mikro-orm/core';
import { Product } from './product.entity';

@Entity({
  tableName: 'ovens',
  discriminatorValue: 'oven',
})
export class Oven extends Product {
  @Property()
  capacity: number;
}
