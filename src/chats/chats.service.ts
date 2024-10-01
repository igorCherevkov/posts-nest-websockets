import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Chat, ChatMessage, UserChat } from '../../db/models';
import { CreateChatDto } from './dto/createChat.dto';
import { CreateMessageDto } from './dto/createMessage.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat) private chatModel: typeof Chat,
    @InjectModel(UserChat) private userChatModel: typeof UserChat,
    @InjectModel(ChatMessage) private chatMessageModel: typeof ChatMessage,
  ) {}

  async getUsersChat(usersIds: number[]): Promise<Chat> {
    return await this.chatModel.findOne({
      where: { isGroup: true },
      include: [
        {
          model: UserChat,
          where: {
            userId: usersIds,
          },
          required: true,
        },
      ],
    });
  }

  async createChat(chat: CreateChatDto): Promise<Chat> {
    if (!chat.isGroup) {
      const existingChat = await this.chatModel.findOne({
        where: { isGroup: chat.isGroup },
        include: [
          {
            model: UserChat,
            where: {
              userId: chat.usersIds,
            },
            required: true,
          },
        ],
      });

      if (existingChat) {
        return existingChat;
      }
    }

    const newChat = await this.chatModel.create({
      isGroup: chat.isGroup,
    });

    await Promise.all(
      chat.usersIds.map((userId) =>
        this.userChatModel.create({ chatId: newChat.id, userId }),
      ),
    );

    return newChat;
  }

  async saveMessage(messageDto: CreateMessageDto): Promise<ChatMessage> {
    const { chatId, userId, message } = messageDto;

    // Найдем запись UserChat для проверки принадлежности пользователя к чату
    const chatUser = await this.userChatModel.findOne({
      where: { chatId, userId },
    });

    // Проверим, существует ли chatUser
    if (!chatUser) {
      throw new Error('User is not part of this chat');
    }

    // Создаем новое сообщение с правильным userId
    const newMessage = await this.chatMessageModel.create({
      chatId,
      userId: chatUser.userId, // Используем userId из chatUser
      message,
    });

    return newMessage;
  }
}
