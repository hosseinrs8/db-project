import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class UpdateEmployeePhoneDto {
  @IsDefined()
  @IsBoolean()
  isSupporter: boolean;

  @IsDefined()
  @IsString()
  number: string;
}
