import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export type UserRoleType = 'admin' | 'user';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty({ example: 'sunny@gmail.com' })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: UserRoleType;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;
}
