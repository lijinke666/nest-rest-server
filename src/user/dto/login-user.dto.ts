import { IsNotEmpty, Length, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class LoginUserCatDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 6)
  @ApiModelProperty({
    description: '用户名',
    required: true,
    type: String,
  })
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 12)
  @ApiModelProperty({
    description: '密码',
    required: true,
    type: String,
  })
  readonly password: string;
}
