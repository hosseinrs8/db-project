import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateStockProductDto {
  @IsDefined()
  @IsString()
  productName: string;

  @IsDefined()
  @IsNumber()
  availableProductCount: number;
}
