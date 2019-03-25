import { Controller, Get, Param, Post, Body, HttpCode, HttpStatus, Delete, Put, UseGuards  } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateCatDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<User> {
    return await this.userService.findOnyById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateCatDto) {
    return await this.userService.create(createUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.deleteOneById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createUserDto: CreateCatDto) {
    return await this.userService.updateOneById(id, createUserDto);
  }
}
