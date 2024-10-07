import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

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

  @Get(':id')
  getAllChats(@Param('id', ParseIntPipe) id: number) {
    return this.chatsService.getAllChats(id);
  }

  @Get('messages/:chatId')
  getChatMessages(@Param('chatId', ParseIntPipe) chatId: number) {
    return this.chatsService.getChatMessages(chatId);
  }

  @Post()
  createChat(@Body() chat: CreateChatDto): Promise<Chat> {
    return this.chatsService.createChat(chat);
  }
}
