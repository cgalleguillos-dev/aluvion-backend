import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.findByEmail(createUserDto.email);
    if (existUser) throw new Error('Usuario ya existe');
    const user = this.userRepository.create(createUserDto);
    user.encryptPassword(createUserDto.password);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: {
        id
      }
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email
      }
    });
  }

  async profile(userId: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      },
      select: ['name', 'email']
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }
}
