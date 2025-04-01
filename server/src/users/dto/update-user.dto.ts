import { PartialType } from '@nestjs/mapped-types';
import { RegistrationUserDto } from './registration-user.dto';

export class UpdateUserDTO extends PartialType(RegistrationUserDto) {}
