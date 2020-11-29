import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID

  @Column()
  name: string

  @Column()
  nickname: string

  @Column()
  brief: string

  @Column()
  avatar: string //头像文件地址，用服务器文件方案而非oss

  @Column()
  pwd: string

  // @OneToMany(type =>Memory,memory =>memory.user)
  // memories:Memory[];
}
