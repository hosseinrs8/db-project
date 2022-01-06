import { IsDefined, IsString } from 'class-validator';

export class UpdateWarehousePhoneDto {
  @IsDefined()
  @IsString()
  number: string;
}
