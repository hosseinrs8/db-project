import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Factory } from './factory.entity';

@Entity({
  tableName: 'factory_phones',
})
export class FactoryPhone {
  @Property({ primary: true })
  key: string;

  @ManyToOne(() => Factory)
  factory: Factory;

  @Property()
  number: string;

  constructor(factory: Factory, number: string) {
    this.factory = factory;
    this.number = number;
    this.key = `${factory.id}${number}`;
  }
}
