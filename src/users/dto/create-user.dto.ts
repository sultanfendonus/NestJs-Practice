import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'sultan@gmail.com' })
  @IsEmail({}, { message: 'Please input a correct email.' })
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'sultan' })
  firstName: string;

  @ApiProperty({ example: 'mahamud' })
  lastName: string;
}
