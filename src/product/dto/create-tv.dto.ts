import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTvDto {
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
  imageResolution: number;

  @IsDefined()
  @IsNumber()
  soundResolution: number;

  @IsDefined()
  @IsNumber()
  energyConsumption: number;

  @IsDefined()
  @IsString()
  os: string;

  @IsDefined()
  @IsNumber()
  sizeIn: number;
}
