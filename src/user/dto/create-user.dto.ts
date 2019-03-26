import { IsNotEmpty, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 6)
  @ApiModelProperty({
    description: '用户名',
    required: true,
    type: String,
  })
  readonly username: string;

  @IsNotEmpty()
  @Length(6, 12)
  @ApiModelProperty({
    description: '密码',
    required: true,
    type: String,
  })
  readonly password: string;

  @Length(11)
  @ApiModelProperty({
    description: '手机号',
    required: false,
    type: String,
  })
  readonly phone?: string;
}
