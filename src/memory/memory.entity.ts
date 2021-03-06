import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class Memory {
  @ObjectIdColumn()
  _id: ObjectID

  @Column()
  date: Date //当前时间

  @Column()
  city: string //城市

  @Column()
  imgs: string[] //图片列表

  @Column()
  story: string //想说的话

  @Column()
  user_id: string //用户id，存string
}
