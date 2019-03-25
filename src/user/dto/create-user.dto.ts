import { IsNotEmpty, MaxLength, IsNumber, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class CreateCatDto {

  @IsNotEmpty()
  @Length(2, 6)
  @ApiModelProperty({
    description: '姓名',
    required: true,
  })
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @MaxLength(11)
  @ApiModelProperty({
    description: '年龄',
    required: true,
  })
  readonly age: number;
}
