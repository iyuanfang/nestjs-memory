import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MemoryController } from './memory.controller'
import { Memory } from './memory.entity'
import { MemoryService } from './memory.service'

@Module({
  imports: [TypeOrmModule.forFeature([Memory])],
  controllers: [MemoryController],
  providers: [MemoryService],
  exports: [MemoryModule],
})
export class MemoryModule {}
