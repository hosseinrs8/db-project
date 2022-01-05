import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Branch } from './branch.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  tableName: 'branch_phones',
})
export class BranchPhone {
  @Property({ primary: true })
  key: string;

  @ApiProperty({
    type: () => Branch,
  })
  @ManyToOne(() => Branch)
  branch: Branch;

  @Property()
  number: string;

  constructor(branch: Branch, number: string) {
    this.branch = branch;
    this.number = number;
    this.key = `${branch.id}${number}`;
  }
}
