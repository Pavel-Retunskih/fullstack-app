import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: User[]; count: number }> {
    const [data, count] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, count };
  }

  async findOne(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${userId} not found, check and try again.`,
      );
    }

    if (user.photo && !(user.photo instanceof Buffer)) {
      if (typeof user.photo === 'object' && 'data' in user.photo) {
        user.photo = Buffer.from((user.photo as any).data);
      }
    }
    return user;
  }

  async create(createUser: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUser);
    return await this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Could not find user with id: ' + id);
    }
    this.usersRepository.merge(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${id} not found, nothing to delete`,
      );
    }
    await this.usersRepository.remove(user);
  }

  async updatePhoto(id: number, photo: Buffer): Promise<User> {
    const user = await this.findOne(id);
    user.photo = photo;
    return this.usersRepository.save(user);
  }
}
