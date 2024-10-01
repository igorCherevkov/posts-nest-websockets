import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import {
  User,
  Post,
  Tag,
  PostTag,
  Chat,
  UserChat,
  ChatMessage,
} from '../db/models';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    PostsModule,
    UsersModule,
    ChatsModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        dialect: configService.get('DB_DIALECT'),
        models: [User, Post, Tag, PostTag, Chat, UserChat, ChatMessage],
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads', 'posts'),
    }),
  ],
})
export class AppModule {}
