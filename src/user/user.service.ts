import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import crypto from '../common/utils/crypto';
import { IPaginationResponse } from 'src/typing/base';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(pageIndex, pageSize): Promise<IPaginationResponse<User[]>> {
    const [resource, total] = await this.userRepository
      .createQueryBuilder() // user 是别名
      .orderBy('id', 'ASC')
      .skip((pageIndex - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
      total,
      resource,
    };
  }

  async findOnyById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findOne(userInfo: Partial<User>): Promise<User> {
    return await this.userRepository.findOne({
      ...userInfo,
      password: crypto.getPassWord(userInfo.password),
    });
  }

  async deleteOneById(id: string) {
    await this.userRepository.delete(id);
  }

  async updateOneById(id: string, createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new BadRequestException('用户不存在!');
    }
    this.userRepository.merge(user, {
      ...createUserDto,
      password: crypto.getPassWord(createUserDto.password),
    });
    await this.userRepository.save(user);
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const password = crypto.getPassWord(createUserDto.password);
    return await this.userRepository.save({
      ...user,
      password,
    });
  }
}
