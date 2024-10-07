import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { Chat, ChatMessage, User, UserChat } from '../../db/models';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [SequelizeModule.forFeature([Chat, UserChat, ChatMessage, User])],
  controllers: [ChatsController],
  providers: [ChatsService, ChatGateway],
})
export class ChatsModule {}
