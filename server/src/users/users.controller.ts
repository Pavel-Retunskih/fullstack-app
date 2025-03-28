import {Controller, Get, Post, Body, Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
@Get(':id')
 findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id)
 }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }
}