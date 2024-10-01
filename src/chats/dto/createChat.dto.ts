import { IsArray, IsBoolean, IsInt, ArrayNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  usersIds: number[];

  @IsBoolean()
  isGroup: boolean;
}
