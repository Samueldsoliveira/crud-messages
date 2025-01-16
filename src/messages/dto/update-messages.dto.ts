import { PartialType } from '@nestjs/mapped-types';
import { CreateMessagesDto } from './create-messages.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateMessagesDto extends PartialType(CreateMessagesDto) {
  @IsBoolean()
  @IsOptional()
  readonly read?: boolean;
}
