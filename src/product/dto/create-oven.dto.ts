import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOvenDto {
  @IsDefined()
  @IsString()
  type: string;

  @IsDefined()
  @IsString()
  model: string;

  @IsDefined()
  @IsString()
  color: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  warranty: Date;

  @IsDefined()
  @IsNumber()
  price: number;

  @IsDefined()
  @IsNumber()
  centralOfficeId: number;

  @IsDefined()
  @IsNumber()
  warehouseId: number;

  @IsDefined()
  @IsNumber()
  factoryId: number;

  @IsDefined()
  @IsNumber()
  capacity: number;
}
