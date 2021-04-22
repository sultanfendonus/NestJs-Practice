import { Exclude, Expose } from 'class-transformer';

export class ReadUserDTO {
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  token: string;

  constructor(partial: Partial<ReadUserDTO>) {
    Object.assign(this, partial);
  }
}
