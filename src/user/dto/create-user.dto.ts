import { IsNotEmpty, Length, IsString, IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 6)
  @ApiModelProperty({
    description: '用户名',
    required: true,
    type: String,
  })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  @ApiModelProperty({
    description: '密码',
    required: true,
    type: String,
  })
  readonly password: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(11)
  @ApiModelProperty({
    description: '手机号',
    required: false,
    type: String,
  })
  readonly phone?: string;
}
