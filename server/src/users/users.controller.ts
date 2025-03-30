import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDTO } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs/promises';
import * as path from 'node:path';
import mime from 'mime-types';
import { UserResponseDto } from './dto/responce-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private transformUserResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      residence: user.residence,
      photoUrl: `http://localhost:3000/users/${user.id}/photo`, // Генерируем URL
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(+id);
  }

  @Post('create')
  async createUser(
    @Body() createUserDto: createUserDto,
    @Query('tempPhotoId') tempPhotoId: string | null,
  ): Promise<UserResponseDto> {
    const requiredFields = [
      'firstName',
      'lastName',
      'height',
      'weight',
      'gender',
      'residence',
    ];
    for (const field of requiredFields) {
      if (createUserDto[field] === undefined || createUserDto[field] === null) {
        throw new BadRequestException(`Field ${field} is required`);
      }
    }
    let photoData: Buffer;
    if (tempPhotoId && tempPhotoId !== 'null' && tempPhotoId !== 'undefined') {
      const tempPhotoPath = path.join('./src/uploads/temp', tempPhotoId);
      try {
        photoData = await fs.readFile(tempPhotoPath);
        await fs.unlink(tempPhotoPath);
      } catch (err) {
        throw new BadRequestException('Temp photo not found or expired');
      }
    } else {
      try {
        const defaultPhotoPath = path.join(
          './src/uploads/defaultAvatar',
          `default-${createUserDto.gender}.jpg`,
        );
        photoData = await fs.readFile(defaultPhotoPath);
      } catch (err) {
        throw new BadRequestException('Default photo not found');
      }
    }

    const newUser = await this.usersService.create({
      ...createUserDto,
      photo: photoData,
    });
    return this.transformUserResponse(newUser);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: updateUserDTO) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get()
  async findAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{
    data: UserResponseDto[];
    count: number;
  }> {
    const users = await this.usersService.findAll(page, limit);
    const response = users.data.map((user) => this.transformUserResponse(user));
    return { data: response, count: users.count };
  }

  @Get(':id/photo')
  async getUserPhoto(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.findOne(+id);
    console.log(user);
    if (!user.photo) {
      throw new NotFoundException('Photo not found');
    }

    res.set({
      'Content-Type': user.photoMimeType || 'image/jpeg',
      'Content-Disposition': `attachment; filename="user-${id}-photo.jpg"`,
      'Content-Length': user.photo.length,
    });

    res.end(user.photo); // Отправляем Buffer напрямую
  }

  //todo: добавить проверку
  @Post('upload-temp-photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './src/uploads/temp',
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const uniqueName = `temp_${Date.now()}_${Math.random().toString(36).slice(2)}_${ext}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadTempPhoto(@UploadedFile() photo: Express.Multer.File) {
    return {
      tempPhotoId: photo.filename,
    };
  }
}
