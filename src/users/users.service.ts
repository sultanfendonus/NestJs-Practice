import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadUserDTO } from './dto/read-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      email: createUserDto.email,
    });
    if (user) {
      throw new NotAcceptableException({
        statusCode: HttpStatus.NOT_ACCEPTABLE,
        message: ['The email already exist'],
        error: 'Not Acceptable',
      });
    }
    const newUser = await this.usersRepository.save(createUserDto);
    return new ReadUserDTO(newUser);
  }

  async findAll() {
    const users = await this.usersRepository.find();
    const userResponses = users.map((user) => new ReadUserDTO(user));
    return userResponses;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ id });
    return new ReadUserDTO(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
