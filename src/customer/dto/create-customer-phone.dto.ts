import { IsDefined, IsString } from 'class-validator';

export class CreateCustomerPhoneDto {
  @IsDefined()
  @IsString()
  number: string;
}
