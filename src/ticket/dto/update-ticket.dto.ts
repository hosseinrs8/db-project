import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTicketDto {
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsNumber()
  supporterId: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  resolvedDate: Date;
}
