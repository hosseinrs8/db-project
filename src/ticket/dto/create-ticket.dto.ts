import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsDefined()
  @IsString()
  message: string;

  @IsDefined()
  @IsString()
  subject: string;

  @IsDefined()
  @IsNumber()
  customerId: number;
}
