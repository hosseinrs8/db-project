import { IsDefined, IsString } from 'class-validator';

export class UpdateBranchPhoneDto {
  @IsDefined()
  @IsString()
  number: string;
}
