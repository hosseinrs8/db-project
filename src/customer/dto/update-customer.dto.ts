import { IsDefined, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsDefined()
  @IsString()
  name: string;
}
