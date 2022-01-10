import { IsOptional, IsString } from 'class-validator';

export class UpdatePhoneDto {
  @IsOptional()
  @IsString()
  number?: string;
}
