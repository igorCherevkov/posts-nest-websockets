import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User, Chat } from './';

@Table({ tableName: 'users_chats', timestamps: true, underscored: true })
export default class UserChat extends Model<UserChat> {
  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Chat)
  chat: Chat;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Chat)
  @Column
  chatId: number;
}
