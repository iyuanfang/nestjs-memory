import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find()
  }
  find(id: string): string {
    if (id == '2') {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    } else {
      return `Return a #${id} user`
    }
  }

  delete(id: string): string {
    return `Delete a #${id} user`
  }
}
