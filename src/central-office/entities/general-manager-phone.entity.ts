import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { GeneralManager } from './general-manager.entity';

@Entity({
  tableName: 'general_manager_phones',
})
export class GeneralManagerPhone {
  @Property({ primary: true })
  key: string;

  @ManyToOne(() => GeneralManager)
  generalManager: GeneralManager;

  @Property()
  number: string;

  constructor(generalManager: GeneralManager, number: string) {
    this.generalManager = generalManager;
    this.number = number;
    this.key = `${generalManager.key}${number}`;
  }
}
