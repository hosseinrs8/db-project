import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsDefined()
  @IsString()
  manager: string;

  @IsDefined()
  @IsNumber()
  monthlyBudget: number;

  @IsDefined()
  @IsString()
  address: string;

  @IsDefined()
  @IsString()
  city: string;
}
