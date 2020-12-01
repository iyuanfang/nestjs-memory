import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('has user', async () => {
    const s: string = await controller.findAll()
    expect(s.length).toBeGreaterThan(0)
  })
})
