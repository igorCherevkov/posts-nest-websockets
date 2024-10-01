import { Table, Model, Column, HasMany } from 'sequelize-typescript';

import { Post } from './';

@Table({ tableName: 'users', timestamps: true, underscored: true })
export default class User extends Model<User> {
  @Column({
    unique: true,
    allowNull: false,
  })
  login: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column
  userImg: string;

  @HasMany(() => Post)
  posts: Post[];
}
