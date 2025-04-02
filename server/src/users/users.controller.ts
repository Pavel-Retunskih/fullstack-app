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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs/promises';
import * as path from 'node:path';
import { ResponseUserDto } from './dto/responce-user.dto';

@Controller('users')
@UsePipes(
  new ValidationPipe({
    exceptionFactory: (errors) => {
      const formattedErrors = errors.reduce<
        Array<{ field: string; message: string }>
      >((acc, curr) => {
        acc.push({
          field: curr.property,
          message: curr.constraints
            ? Object.values(curr.constraints).join(', ')
            : '',
        });
        return acc;
      }, []);

      return new BadRequestException({
        message: 'Some field is empty or invalid',
        errors: formattedErrors,
      });
    },
  }),
)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private transformUserResponse(user: User): ResponseUserDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      residence: user.residence,
      photoUrl: `http://localhost:3000/users/${user.id}/photo`,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ResponseUserDto> {
    const user = await this.usersService.findOne(+id);
    return this.transformUserResponse(user);
  }

  @Post('create')
  async createUser(
    @Body() createUserDto: RegistrationUserDto,
    @Query('tempPhotoId') tempPhotoId: string | null,
  ): Promise<ResponseUserDto> {
    let photoData: Buffer;
    if (tempPhotoId && tempPhotoId !== 'null' && tempPhotoId !== 'undefined') {
      const tempPhotoPath = path.join('./src/uploads/temp', tempPhotoId);
      try {
        photoData = await fs.readFile(tempPhotoPath);
        await fs.unlink(tempPhotoPath);
      } catch (err) {
        throw new BadRequestException('Temp photo not found or expired', err);
      }
    } else {
      try {
        const defaultPhotoPath = path.join(
          './src/uploads/defaultAvatar',
          `default-${createUserDto.gender}.jpg`,
        );
        photoData = await fs.readFile(defaultPhotoPath);
      } catch (err) {
        throw new BadRequestException('Default photo not found', err);
      }
    }

    const newUser = await this.usersService.create({
      ...createUserDto,
      photo: photoData,
    });

    return this.transformUserResponse(newUser);
  }

  @Patch('update/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    await this.usersService.remove(+id);
    return `User with id: ${id} successful deleted`;
  }

  @Get()
  async findAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{
    data: ResponseUserDto[];
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
      'Content-Type': user.photoMimeType || 'image/jpg',
      'Content-Disposition': `attachment; filename="user-${id}-photo.jpg"`,
      'Content-Length': user.photo.length,
    });

    res.end(user.photo);
  }

  //todo: добавить проверку
  @Post('upload-temp-photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './src/uploads/temp',
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const uniqueName = `temp_${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  uploadTempPhoto(@UploadedFile() photo: Express.Multer.File) {
    return {
      tempPhotoId: photo.filename,
    };
  }
}
