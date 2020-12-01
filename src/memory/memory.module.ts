import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { diskStorage } from 'multer'
import { MemoryController } from './memory.controller'
import { Memory } from './memory.entity'
import { MemoryService } from './memory.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Memory]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
          cb(null, './static/img/')
        },
        filename: (req: any, file: any, cb: any) => {
          const type = file.originalname.split('.')[1]
          cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
        },
      }),
    }),
  ],
  controllers: [MemoryController],
  providers: [MemoryService],
  exports: [MemoryModule],
})
export class MemoryModule {}
