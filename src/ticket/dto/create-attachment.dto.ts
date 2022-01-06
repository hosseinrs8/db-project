import { IsDefined, IsString } from 'class-validator';

export class CreateAttachmentDto {
  @IsDefined()
  @IsString()
  attachment: string;

  @IsDefined()
  @IsString()
  fileName: string;
}
