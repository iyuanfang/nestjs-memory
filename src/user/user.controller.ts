import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async findAll(): Promise<string> {
    return JSON.stringify(await this.userService.findAll())
  }

  @Get('name/:name')
  getName(@Param('name') name: string) {
    return this.userService.isNameExist(name)
  }

  @Post('login')
  login(@Body() loginForm: any) {
    const name = loginForm.name
    const pwd = loginForm.pwd
    return this.userService.login(name, pwd)
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

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() userJson: any) {
    let user: User = await this.userService.find(id)
    user = Object.assign(user, userJson)
    this.userService.update(id, user)
    return 'Patching a user #' + id + ':' + JSON.stringify(userJson)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.userService.delete(id)
  }

  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  async avatar(@UploadedFile() file: any, @Param('id') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sharp = require('sharp')
    console.log(file)

    const path = file.path
    sharp(path)
      .resize(100, 100)
      .toFile(path + '.jpg')
    const user: User = await this.userService.find(id)
    user.avatar = file.filename + '.jpg'
    this.userService.update(id, user)
    return user.avatar
  }
}
