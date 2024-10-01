import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { PostsService } from './posts.service';
import { Post as PostModel } from 'db/models';
import { CreatePostDto } from './dto/createPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll(): Promise<PostModel[]> {
    return this.postsService.getAll();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('postImg', {
      storage: diskStorage({
        destination: './uploads/posts',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}${file.originalname.replaceAll(' ', '')}`;
          cb(null, filename);
        },
      }),
    }),
  )
  createPost(
    @Body() post: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.postsService.createPost(post, file.filename);
  }
}
