import { IsString, IsObject, IsNotEmpty } from 'class-validator';

export class CreateWebhookDto {
  @IsString({ message: 'The "source" field must be a non-empty string.' })
  @IsNotEmpty({ message: 'The "source" field cannot be empty.' })
  source: string;

  @IsObject({ message: 'The "data" field must be a valid object.' })
  data: Record<string, any>;
}
