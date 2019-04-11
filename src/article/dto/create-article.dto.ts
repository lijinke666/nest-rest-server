import {
  IsNotEmpty,
  Length,
  IsString,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiModelProperty({
    description: '文章名',
    required: true,
    maxLength: 20,
    type: String,
  })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({
    description: '文章内容',
    required: true,
    type: String,
  })
  readonly content: string;

  @ApiModelProperty({
    description: '用户id',
    required: true,
    type: Number,
  })
  readonly userId?: number;
}
