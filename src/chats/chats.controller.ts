import { Body, Controller, Get, Post } from '@nestjs/common';

import { ChatsService } from './chats.service';
import { Chat } from '../../db/models';
import { CreateChatDto } from './dto/createChat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  getUsersChat(@Body() usersIds: number[]): Promise<Chat> {
    return this.chatsService.getUsersChat(usersIds);
  }

  @Post()
  createChat(@Body() chat: CreateChatDto): Promise<Chat> {
    return this.chatsService.createChat(chat);
  }
}
