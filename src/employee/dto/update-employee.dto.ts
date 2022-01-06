import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Responsibility } from '../entities/employee.entity';
import { Speciality } from '../entities/supporter.entity';

export class UpdateEmployeeDto {
  @IsDefined()
  @IsBoolean()
  isSupporter: boolean;

  @IsOptional()
  @IsNumber()
  idNumber?: number;

  @IsOptional()
  @IsEnum(Responsibility)
  responsibility?: Responsibility;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  hourlySalary?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  hoursWorked?: number;

  @IsOptional()
  @IsEnum(Speciality)
  speciality?: Speciality; //employee is supporter if defined
}
