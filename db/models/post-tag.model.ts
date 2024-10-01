import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';

import { Post, Tag } from './';

@Table({ tableName: 'posts_tags', timestamps: true, underscored: true })
export default class PostTag extends Model<PostTag> {
  @ForeignKey(() => Post)
  @Column
  postId: number;

  @ForeignKey(() => Tag)
  @Column
  tagId: number;
}
