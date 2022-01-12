import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Supporter } from './supporter.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  tableName: 'supporter_phones',
})
export class SupporterPhone {
  @Property({ primary: true })
  key: string;

  @ApiProperty({
    type: () => Supporter,
  })
  @ManyToOne(() => Supporter)
  supporter: Supporter;

  @Property()
  number: string;

  constructor(supporter: Supporter, number: string) {
    this.supporter = supporter;
    this.number = number;
    this.key = `${supporter.id}${number}`;
  }
}
