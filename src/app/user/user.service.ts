import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    try {
      return await this.userRepository.find({
        select: ['id', 'name', 'email'],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(options: FindOneOptions<UserEntity>) {
    try {
      return await this.userRepository.findOne(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneOrFail(options: FindOneOptions<UserEntity>) {
    try {
      return await this.userRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateUserDto) {
    const userVerify = await this.findOne({
      where: { email: data.email },
    });

    if (userVerify) {
      new HttpException(MessagesHelper.EMAIL_DUPLICATE, HttpStatus.CONFLICT);
    }

    const user = await this.userRepository.save(
      this.userRepository.create(data),
    );

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOneOrFail({ where: { id } });
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async destroy(id: string) {
    await this.findOneOrFail({ where: { id } });
    this.userRepository.softDelete({ id });
  }
}
