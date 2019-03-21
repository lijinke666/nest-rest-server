import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateCatDto } from './dto/create-user.dto';

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

  async deleteOneById(id: string) {
    return await this.userRepository.delete(id);
  }

  async create(createUserDto: CreateCatDto) {
    return await this.userRepository.create(createUserDto);
  }
}
