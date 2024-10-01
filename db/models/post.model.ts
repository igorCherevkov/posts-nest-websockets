import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';

import { User, PostTag, Tag } from './';

@Table({ tableName: 'posts', timestamps: true, underscored: true })
export default class Post extends Model<Post> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column({
    allowNull: false,
  })
  title: string;

  @Column({
    allowNull: false,
  })
  content: string;

  @Column
  postImg: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Tag, () => PostTag)
  tags: Tag[];
}
