import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class CreateEmployeePhoneDto {
  @IsDefined()
  @IsBoolean()
  isSupporter: boolean;

  @IsDefined()
  @IsString()
  number: string;
}
