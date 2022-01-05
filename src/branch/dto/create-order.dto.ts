import { IsDate, IsDefined, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsDefined()
  @IsNumber()
  warehouseId: number;

  @IsDefined()
  @IsString()
  typeOfProduct: string;

  @IsDefined()
  @IsNumber()
  numberOfProduct: number;

  @IsDefined()
  @IsDate()
  @Type(() => Date)
  deliveryDate: Date;
}
