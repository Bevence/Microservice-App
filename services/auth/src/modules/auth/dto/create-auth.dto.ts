import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  fullName: string;

  @IsString()
  userName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
