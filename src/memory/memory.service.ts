import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Memory } from './memory.entity'
import { ObjectId } from 'mongodb'

@Injectable()
export class MemoryService {
  private readonly logger = new Logger(MemoryService.name)
  constructor(
    @InjectRepository(Memory) private memoryRepository: Repository<Memory>,
  ) {}
  async getAll() {
    return await this.memoryRepository.find()
  }

  async getOne(id: string) {
    const memory: Memory = await this.memoryRepository.findOne({
      _id: new ObjectId(id),
    })

    console.log('find memory:', memory)

    return memory
  }

  async getByUser(user_id: string, take: number, skip: number) {
    console.log(`get memory by user:${user_id},take:${take},skip:${skip}`)
    const memories = await this.memoryRepository.find({
      where: { user_id: user_id },
      order: { date: 'DESC' },
      //   take: take,
      //   skip: skip,
    })
    return memories
  }

  async save(memory: Memory) {
    return await this.memoryRepository.save(memory)
  }

  async update(id: string, memory: Memory) {
    await this.memoryRepository.update({ _id: new ObjectId(id) }, memory)
    console.log('Update memory ', memory)
  }

  async delete(id: string) {
    await this.memoryRepository.delete({ _id: new ObjectId(id) })
    console.log('Remove memory id:', id)
  }
}
