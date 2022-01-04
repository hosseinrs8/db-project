import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Branch } from './entities/branch.entity';
import { BranchPhone } from './entities/branch-phone.entity';
import { OrderPivot } from './entities/order-pivot.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Branch, BranchPhone, OrderPivot])],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
