import { IsDefined, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsDefined()
  @IsString()
  name: string;
}
