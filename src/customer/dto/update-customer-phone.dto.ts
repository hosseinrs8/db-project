import { IsDefined, IsString } from 'class-validator';

export class UpdateCustomerPhoneDto {
  @IsDefined()
  @IsString()
  number: string;
}
