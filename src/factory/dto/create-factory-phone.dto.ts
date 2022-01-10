import { IsDefined, IsString } from 'class-validator';

export class CreateFactoryPhoneDto {
  @IsDefined()
  @IsString()
  number: string;
}
