import { Module } from '@nestjs/common';
import { FactoryService } from './factory.service';
import { FactoryController } from './factory.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Factory } from './entities/factory.entity';
import { FactoryPhone } from './entities/factory-phone.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Factory, FactoryPhone])],
  providers: [FactoryService],
  controllers: [FactoryController],
})
export class FactoryModule {}
