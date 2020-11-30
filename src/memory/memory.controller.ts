import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { MemoryService } from './memory.service'
import { Memory } from './memory.entity'

@Controller('memory')
export class MemoryController {
  constructor(private memoryService: MemoryService) {}

  @Get()
  async getAll() {
    return JSON.stringify(await this.memoryService.getAll())
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return JSON.stringify(await this.memoryService.getOne(id))
  }

  @Get('user/:id/:take/:skip')
  async getByUser(
    @Param('id') id: string,
    @Param('take') take: number,
    @Param('skip') skip: number,
  ) {
    return JSON.stringify(await this.memoryService.getByUser(id, take, skip))
  }

  @Post()
  post(@Body() memoryJson: any) {
    const memory: Memory = Object.assign(new Memory(), memoryJson)
    memory.date = new Date()
    this.memoryService.save(memory)
    return 'Saving memory：' + JSON.stringify(memory)
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() memoryJson: any) {
    const memory: Memory = Object.assign(new Memory(), memoryJson)
    this.memoryService.update(id, memory)
    return 'Updating a memory #' + id + ':' + JSON.stringify(memory)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.memoryService.delete(id)
    return 'Deleted memory #' + id
  }

  //   @Post('upload')
  //   async avatar(
  //     @UploadedFiles('memory', { options: memoryUploadOptions }) files: any[],
  //   ) {
  //     console.log("upload memory':", files)
  //     var sharp = require('sharp')
  //     let imgs = []
  //     for (let file of files) {
  //       imgs.push(file.filename)
  //       let path = file.path
  //       sharp(path)
  //         .resize(360, 270)
  //         .toFile(path + '.jpg') //创建压缩图，直接加.jpg
  //     }
  //     return imgs
  //   }
}
