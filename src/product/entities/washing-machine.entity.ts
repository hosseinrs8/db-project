import { Entity, Property } from '@mikro-orm/core';
import { Product } from './product.entity';

@Entity({
  tableName: 'washing_machines',
  discriminatorValue: 'washing_machine',
})
export class WashingMachine extends Product {
  @Property()
  sizeKg: number;

  @Property()
  energyConsumption: number;
}
