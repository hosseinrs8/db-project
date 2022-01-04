import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Warehouse } from './entities/warehouse.entity';
import { WarehousePhone } from './entities/warehouse-phone.entity';
import { StockProducts } from './entities/stock-products.entity';
import { DeliveryPivot } from './entities/delivery-pivot.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Warehouse,
      WarehousePhone,
      StockProducts,
      DeliveryPivot,
    ]),
  ],
  providers: [WarehouseService],
  controllers: [WarehouseController],
})
export class WarehouseModule {}
