import { Entity, Property } from '@mikro-orm/core';
import { Product } from './product.entity';

@Entity({
  tableName: 'microwaves',
  discriminatorValue: 'microwave',
})
export class Microwave extends Product {
  @Property()
  capacity: number;

  @Property()
  energyConsumption: number;
}
