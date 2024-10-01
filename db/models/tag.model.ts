import { Table, Model, Column, BelongsToMany } from 'sequelize-typescript';

import { Post, PostTag } from './';

@Table({ tableName: 'tags', timestamps: true, underscored: true })
export default class Tag extends Model<Tag> {
  @Column({
    allowNull: false,
    unique: true,
  })
  name: string;

  @BelongsToMany(() => Post, () => PostTag)
  posts: Post[];
}
