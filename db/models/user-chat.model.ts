import { Table, Model, HasMany, ForeignKey } from 'sequelize-typescript';

import { User, Chat } from './';

@Table({ tableName: 'users_chats', timestamps: true, underscored: true })
export default class UserChat extends Model<UserChat> {
  @ForeignKey(() => User)
  userId: number;

  @ForeignKey(() => Chat)
  chatId: number;
}
