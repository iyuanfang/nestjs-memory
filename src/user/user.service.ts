import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  findAll(): string {
    return 'Find all user'
  }
  find(id: string): string {
    if (id == '2') {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    } else {
      return `Return a #${id} user`
    }
  }
}
