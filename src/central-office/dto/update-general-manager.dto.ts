import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGeneralManagerDto {
  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsNumber()
  hoursWorked?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  hourlySalary?: number;
}
