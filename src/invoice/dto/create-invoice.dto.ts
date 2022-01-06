import { IsArray, IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsDefined()
  @IsNumber()
  price: number;

  @IsDefined()
  @IsNumber()
  customerId: number;

  @IsDefined()
  @IsString()
  address: string;

  @IsDefined()
  @IsString()
  city: string;

  @IsDefined()
  @IsNumber()
  branchId: number;

  @IsDefined()
  @IsArray()
  productIds: Array<number>;
}
