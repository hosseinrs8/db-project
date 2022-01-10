import { IsOptional, IsString } from 'class-validator';

export class UpdateFactoryDto {
  @IsOptional()
  @IsString()
  ceo?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
