import { Module } from '@nestjs/common';
import { CentralOfficeService } from './central-office.service';
import { CentralOfficeController } from './central-office.controller';

@Module({
  providers: [CentralOfficeService],
  controllers: [CentralOfficeController],
})
export class CentralOfficeModule {}
