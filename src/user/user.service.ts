import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { ObjectId } from 'mongodb'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    this.logger.debug('find all')
    return this.userRepository.find()
  }
  find(id: string): Promise<User> {
    this.logger.debug(`Find user id:${id}`)
    return this.userRepository.findOne({ _id: new ObjectId(id) })
  }

  create(user: User): Promise<User> {
    this.logger.debug(`Save user:${user.name}`)
    return this.userRepository.save(user)
  }

  update(id: string, user: User) {
    this.logger.debug(`Update user id:${id}`)
    this.userRepository.update({ _id: new ObjectId(id) }, user)
  }

  delete(id: string) {
    this.logger.debug(`Remove user id:${id}`)
    this.userRepository.delete({ _id: new ObjectId(id) })
  }
  async isNameExist(name: string): Promise<boolean> {
    const user: User = await this.userRepository.findOne({ name: name })
    if (user) {
      return true
    } else {
      return false
    }
  }

  async login(name: string, pwd: string): Promise<string> {
    const user: User = await this.userRepository.findOne({
      name: name,
      pwd: pwd,
    })
    this.logger.debug(`Login user:${name}`)
    if (!user) {
      return ''
    } else {
      return String(user._id)
    }
  }
}
