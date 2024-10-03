import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Chat, ChatMessage, UserChat } from '../../db/models';
import { CreateChatDto } from './dto/createChat.dto';
import { CreateMessageDto } from './dto/createMessage.dto';
import { Op } from 'sequelize';

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

  async getAllChats(userId: number) {
    const chats = await this.chatModel.findAll({
      attributes: { exclude: ['created_at', 'updated_at'] },
      include: [
        {
          model: ChatMessage,
          required: true,
          limit: 1,
          order: [['created_at', 'DESC']],
          attributes: { exclude: ['chatId', 'userId', 'updated_at'] },
        },
      ],
    });

    return chats.filter((chat) => chat.messages.length > 0);
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

    const chatUser = await this.userChatModel.findOne({
      where: { chatId, userId },
    });

    if (!chatUser) {
      throw new Error('User is not part of this chat');
    }

    const newMessage = await this.chatMessageModel.create({
      chatId,
      userId: chatUser.userId,
      message,
    });

    return newMessage;
  }
}
