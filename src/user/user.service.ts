import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';
import { LoginUserCatDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOnyById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findOne(userInfo: Partial<User>): Promise<User> {
    return await this.userRepository.findOne({
      ...userInfo,
      password: this.getPassWord(userInfo.password)
    });
  }

  async deleteOneById(id: string) {
    return await this.userRepository.delete(id);
  }

  async updateOneById(id: string, createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne(id);
    this.userRepository.merge(user, {
      ...createUserDto,
      password: this.getPassWord(createUserDto.password)
    });
    return await this.userRepository.save(user);
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const password = this.getPassWord(createUserDto.password)
    return await this.userRepository.save({
      ...user,
      password,
    });
  }

  private getPassWord(password: string) {
    return crypto
      .createHash('md5')
      .update(password)
      .digest('hex');
  }
}
