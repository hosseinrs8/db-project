import { Module } from '@nestjs/common';
import { FactoryService } from './factory.service';
import { FactoryController } from './factory.controller';

@Module({
  providers: [FactoryService],
  controllers: [FactoryController],
})
export class FactoryModule {}
