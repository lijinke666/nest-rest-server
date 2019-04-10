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
  UploadedFile,
  UseInterceptors,
  Query,
  CacheKey,
} from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiImplicitFile, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/guards/roles.gurad';
import { ROLES } from '../roles/constants/roles.constants';
import { IPaginationResponse } from '../typing/base';

@ApiBearerAuth()
@ApiUseTags('用户管理')
@Controller('user')
// @UseGuards(RolesGuard,JwtAuthGuard)
@Roles(ROLES.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @CacheKey('userList')
  @ApiOperation({ title: '获取用户列表' })
  async findAll(@Query() params: PaginationDto = { pageIndex: 1, pageSize: 10 }): Promise<IPaginationResponse<User[]>> {
    return await this.userService.findAll(params.pageIndex, params.pageSize);
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

  @Post('avatarUpload')
  @ApiOperation({ title: '头像上传' })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: '头像文件流' })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    const filePath = join(
      __dirname,
      file.originalname.replace(/(.*)\.(jpeg|png|jpg)/, `${Date.now()}.$2`),
    );
    writeFileSync(filePath, file.buffer);
  }
}
