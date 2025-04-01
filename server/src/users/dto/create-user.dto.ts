import { RegistrationUserDto } from './registration-user.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto extends RegistrationUserDto {
  @IsNotEmpty()
  photo: Buffer;
}
