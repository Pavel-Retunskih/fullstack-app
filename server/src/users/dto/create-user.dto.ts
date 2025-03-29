import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import * as buffer from 'node:buffer';
import { Type } from 'class-transformer';

export class createUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsString()
  gender: 'male' | 'female';

  @IsNotEmpty()
  @IsString()
  residence: string;

  @IsNotEmpty()
  @Type(() => Buffer)
  photo: Buffer;
}
