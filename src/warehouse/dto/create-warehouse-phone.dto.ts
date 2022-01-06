import { IsDefined, IsString } from 'class-validator';

export class CreateWarehousePhoneDto {
  @IsDefined()
  @IsString()
  number: string;
}
