import { Module } from '@nestjs/common';
import { CentralOfficeService } from './central-office.service';
import { CentralOfficeController } from './central-office.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CentralOffice } from './entities/central-office.entity';
import { CentralOfficePhone } from './entities/central-office-phone.entity';
import { GeneralManager } from './entities/general-manager.entity';
import { GeneralManagerPhone } from './entities/general-manager-phone.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      CentralOffice,
      CentralOfficePhone,
      GeneralManager,
      GeneralManagerPhone,
    ]),
  ],
  providers: [CentralOfficeService],
  controllers: [CentralOfficeController],
})
export class CentralOfficeModule {}
