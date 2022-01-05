import { IsDefined, IsString } from 'class-validator';

export class CreateBranchPhoneDto {
  @IsDefined()
  @IsString()
  number: string;
}
