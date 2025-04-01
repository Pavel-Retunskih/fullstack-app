import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { RegistrationUserDto } from './registration-user.dto';

export class ResponseUserDto extends RegistrationUserDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  photoUrl: string;
}
