import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async findAll(): Promise<string> {
    return JSON.stringify(await this.userService.findAll())
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<string> {
    return JSON.stringify(await this.userService.find(id))
  }

  @Post()
  async create(@Body() createUserDTO: any) {
    const user: User = Object.assign(new User(), createUserDTO)
    const userSaved = await this.userService.create(user)
    return JSON.stringify(userSaved)
  }

  @Put(':id')
  update(@Body() updateCatDTO: any, @Param('id') id: string) {
    const user: User = Object.assign(new User(), updateCatDTO)
    this.userService.update(id, user)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.userService.delete(id)
  }
}
