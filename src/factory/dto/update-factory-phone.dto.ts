import { IsDefined, IsString } from 'class-validator';

export class UpdateFactoryPhoneDto {
  @IsDefined()
  @IsString()
  number: string;
}
