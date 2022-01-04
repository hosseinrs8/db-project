import { Module } from '@nestjs/common';
import { CentralOfficeService } from './central-office.service';
import { CentralOfficeController } from './central-office.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CentralOffice } from './entities/central-office.entity';

@Module({
  imports: [MikroOrmModule.forFeature([CentralOffice])],
  providers: [CentralOfficeService],
  controllers: [CentralOfficeController],
})
export class CentralOfficeModule {}
