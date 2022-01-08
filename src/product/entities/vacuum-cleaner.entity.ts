import { Entity, Property } from '@mikro-orm/core';
import { Product } from './product.entity';

@Entity({
  tableName: 'vacuum_cleaners',
  discriminatorValue: 'vacuum_cleaner',
})
export class VacuumCleaner extends Product {
  @Property()
  capacity: number;

  @Property()
  energyConsumption: number;
}
