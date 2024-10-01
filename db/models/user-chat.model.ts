import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';

import { User, Chat } from './';

@Table({ tableName: 'users_chats', timestamps: true, underscored: true })
export default class UserChat extends Model<UserChat> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Chat)
  @Column
  chatId: number;
}
