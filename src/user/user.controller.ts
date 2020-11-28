import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  findAll(): string {
    return this.userService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string): string {
    return `Return a #${id} user`;
  }

  @Post()
  create(@Body() createCatDTO: any) {
    return 'Create a user';
  }

  @Put(':id')
  update(@Body() updateCatDTO: any, @Param('id') id: string) {
    return `Update a #${id} user`;
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    return `Delete a #${id} user`;
  }
}
