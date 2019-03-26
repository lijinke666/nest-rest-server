import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';

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

  async findOne(user: Partial<User>): Promise<User> {
    return await this.userRepository.findOne(user);
  }

  async deleteOneById(id: string) {
    return await this.userRepository.delete(id);
  }

  async updateOneById(id: string, createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne(id);
    this.userRepository.merge(user, createUserDto);
    return await this.userRepository.save(user);
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const password = crypto
      .createHash('md5')
      .update(createUserDto.password)
      .digest('hex');
    return await this.userRepository.save({
      ...user,
      password,
    });
  }
}
