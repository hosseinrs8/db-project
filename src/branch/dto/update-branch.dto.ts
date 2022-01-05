import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBranchDto {
  @IsOptional()
  @IsString()
  manager?: string;

  @IsOptional()
  @IsNumber()
  monthlyBudget?: number;

  @IsDefined()
  @IsString()
  address?: string;

  @IsDefined()
  @IsString()
  city?: string;
}
