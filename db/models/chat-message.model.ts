import {
  Table,
  Model,
  HasMany,
  ForeignKey,
  Column,
} from 'sequelize-typescript';
import UserChat from './user-chat.model';

@Table({ tableName: 'chats_messages', timestamps: true, underscored: true })
export default class ChatMessage extends Model<ChatMessage> {
  @ForeignKey(() => UserChat)
  userChatId: number;

  @Column({ allowNull: false })
  message: string;
}
