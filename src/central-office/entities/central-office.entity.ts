import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class CentralOffice {
  @PrimaryKey()
  id: number;
}
