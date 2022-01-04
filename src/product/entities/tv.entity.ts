import { Entity, Property } from '@mikro-orm/core';
import { Product } from './product.entity';

@Entity({
  tableName: 'tvs',
  discriminatorValue: 'tv',
})
export class Tv extends Product {
  @Property()
  imageResolution: number;

  @Property()
  soundResolution: number;

  @Property()
  energyConsumption: number;

  @Property()
  os: string;

  @Property()
  sizeIn: number;
}
