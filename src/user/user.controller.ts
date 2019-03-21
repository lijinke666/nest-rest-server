import { Controller, Get, Param, Post, Body, HttpCode, HttpStatus, Delete, Put } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateCatDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOneById(@Param() param): Promise<User> {
    return await this.userService.findOnyById(param.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateCatDto) {
    return await this.userService.create(createUserDto);
  }

  @Delete(':id')
  async deleteOneById(@Param() param) {
    return await this.userService.deleteOneById(param.id);
  }

  @Put(':id')
  async updateOneById(@Body() createUserDto: CreateCatDto) {
    return await this.userService.updateOneById(createUserDto);
  }
}
