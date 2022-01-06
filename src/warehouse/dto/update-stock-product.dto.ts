import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStockProductDto {
  @IsOptional()
  @IsString()
  productName: string;

  @IsOptional()
  @IsNumber()
  availableProductCount: number;
}
