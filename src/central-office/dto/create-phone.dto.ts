import { IsDefined, IsEnum, IsString } from 'class-validator';

export enum PhoneOwners {
  centralOffice,
  generalManager,
}

export class CreatePhoneDto {
  @IsDefined()
  @IsEnum(PhoneOwners)
  owner: PhoneOwners;

  @IsDefined()
  @IsString()
  number: string;
}
