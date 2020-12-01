import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserService } from './user.service'
import { diskStorage } from 'multer'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
          cb(null, './static/avatar/')
        },
        filename: (req: any, file: any, cb: any) => {
          const type = file.originalname.split('.')[1]
          cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
