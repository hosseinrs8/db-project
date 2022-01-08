import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from './entities/product.entity';
import { Oven } from './entities/oven.entity';
import { Microwave } from './entities/microwave.entity';
import { Refrigerator } from './entities/refrigerator.entity';
import { Tv } from './entities/tv.entity';
import { VacuumCleaner } from './entities/vacuum-cleaner.entity';
import { WashingMachine } from './entities/washing-machine.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Product,
      Microwave,
      Oven,
      Refrigerator,
      Tv,
      VacuumCleaner,
      WashingMachine,
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
