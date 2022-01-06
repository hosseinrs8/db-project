import { IsDefined, IsString } from 'class-validator';

export class CreateWarehouseDto {
  @IsDefined()
  @IsString()
  foreman: string;

  @IsDefined()
  @IsString()
  city: string;

  @IsDefined()
  @IsString()
  address: string;

  @IsDefined()
  @IsString()
  monthlyBudget: number;
}
