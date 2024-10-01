import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

import { Tag } from '../../../db/models';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) =>
    value.replace(/\s+/g, ' ').trim(),
  )
  title: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) =>
    value.replace(/\s+/g, ' ').trim(),
  )
  content: string;

  //   @IsString()
  //   @IsOptional()
  //   postImg: string;

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }: TransformFnParams) =>
    value.replace(/\s+/g, ' ').trim(),
  )
  tags: Tag[];

  //   @IsNumber()
  //   @IsNotEmpty()
  //   userId: number;
}
