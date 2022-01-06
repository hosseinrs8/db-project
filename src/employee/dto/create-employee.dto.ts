import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Responsibility } from '../entities/employee.entity';
import { Speciality } from '../entities/supporter.entity';

export class CreateEmployeeDto {
  @IsDefined()
  @IsNumber()
  idNumber: number;

  @IsDefined()
  @IsEnum(Responsibility)
  responsibility: Responsibility;

  @IsDefined()
  @IsString()
  address: string;

  @IsDefined()
  @IsNumber()
  hourlySalary: number;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  hoursWorked: number;

  @IsOptional()
  @IsEnum(Speciality)
  speciality: Speciality; //employee is supporter if defined
}
