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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Post('create')
  async createUser(
    @Body() createUserDto: createUserDto,
    tempPhotoId?: number,
  ): Promise<User> {
    let photoData: Buffer;
    let photoMimeType: string;
    if (tempPhotoId) {
      const tempPhotoPath = `./uploads/temp/${tempPhotoId}`;
      try {
        photoData = await fs.readFile(tempPhotoPath);

        await fs.unlink(tempPhotoPath);
      } catch (err) {
        throw new BadRequestException('Temp photo not found or expired');
      }
    } else {
      try {
        const defaultPhotoPath = `./uploads/defaultAvatar/default-${createUserDto.gender}`;
        photoData = await fs.readFile(defaultPhotoPath);
      } catch (err) {
        throw new BadRequestException('Some error occurred');
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

  @Post('upload-temp-photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/temp',
        filename: (req, file, cb) => {
          const uniqueName = `temp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
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
