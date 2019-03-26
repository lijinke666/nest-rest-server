import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Put,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { LoginUserCatDto } from './dto/login-user.dto';

@ApiBearerAuth()
@ApiUseTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ title: '获取用户列表' })
  async login(@Body() userInfo: LoginUserCatDto) {
    return await this.userService.login(userInfo);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ title: '获取用户列表' })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ title: '获取单个用户' })
  async findOneById(@Param('id') id: string): Promise<User> {
    return await this.userService.findOnyById(id);
  }

  async findOne(@Param() param: User): Promise<User> {
    return await this.userService.findOne(param);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ title: '创建用户' })
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return await this.userService.create(createUserDto);
  }

  @Delete(':id')
  @ApiOperation({ title: '删除' })
  async remove(@Param('id') id: string) {
    return await this.userService.deleteOneById(id);
  }

  @Put(':id')
  @ApiOperation({ title: '修改用户' })
  async update(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    return await this.userService.updateOneById(id, createUserDto);
  }
}
