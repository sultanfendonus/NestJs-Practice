import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadUserDTO } from './dto/read-user.dto';
import { CustomException } from '../helper/custom.exception';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { secretKey } from './helper/constant';

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
      throw new CustomException(
        {
          statusCode: HttpStatus.NOT_ACCEPTABLE,
          message: ['The email already exist'],
          error: 'Not Acceptable',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const newUser = await this.usersRepository.save(createUserDto);
    const token = await jwt.sign(
      { email: newUser.email, id: newUser.id },
      secretKey,
    );
    return new ReadUserDTO({ ...newUser, token });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersRepository.findOne({
      email: loginUserDto.email,
    });
    if (user) {
      const isValidUser = await bcrypt.compareSync(
        loginUserDto.password,
        user.password,
      );
      if (isValidUser) {
        const token = await jwt.sign(
          { email: user.email, id: user.id },
          secretKey,
        );
        return new ReadUserDTO({ ...user, token });
      } else {
        throw new CustomException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: ['Invalid Credentials'],
            error: 'Invalid Credentials',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new CustomException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: ['Invalid Credentials'],
          error: 'Invalid Credentials',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
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
