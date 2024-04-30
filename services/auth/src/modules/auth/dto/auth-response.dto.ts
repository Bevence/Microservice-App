import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @Expose()
  id: string;
  @Expose()
  fullName: string;
  @Expose()
  userName: string;
  @Expose()
  email: string;
  @Expose()
  accessToken: string;
}
