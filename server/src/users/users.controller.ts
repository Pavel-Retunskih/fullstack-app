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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDTO } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs/promises';
import * as path from 'node:path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(+id);
  }

  @Post('create')
  async createUser(
    @Body() createUserDto: createUserDto,
    tempPhotoId?: string,
  ): Promise<User> {
    let photoData: Buffer;
    if (tempPhotoId) {
      const tempPhotoPath = `./src/uploads/temp/${tempPhotoId}`;
      try {
        photoData = await fs.readFile(tempPhotoPath);

        await fs.unlink(tempPhotoPath);
      } catch (err) {
        throw new BadRequestException('Temp photo not found or expired');
      }
    } else {
      try {
        const defaultPhotoPath = `./src/uploads/defaultAvatar/default-${createUserDto.gender}.jpg`;
        photoData = await fs.readFile(defaultPhotoPath);
      } catch (err) {
        throw new BadRequestException(`Some error occurred ${err}`);
      }
    }
    return this.usersService.create({
      ...createUserDto,
      photo: photoData,
    });
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
  findAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{
    data: User[];
    count: number;
  }> {
    return this.usersService.findAll(page, limit);
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
