import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCentralOfficeDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  yearlyIncome?: number;
}
