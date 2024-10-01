import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User, Post, Tag } from '../../db/models';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postModel: typeof Post) {}

  async getAll(): Promise<Post[]> {
    return this.postModel.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'title',
        'postImg',
        'content',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'login', 'email', 'userImg'],
        },
        {
          model: Tag,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async createPost(post: CreatePostDto, file: string): Promise<Post> {
    const filePath = `uploads/posts/${file}`;
    const newPost = await this.postModel.create({ ...post, postImg: filePath });
    return this.postModel.findOne({
      where: newPost.id,
      attributes: [
        'id',
        'title',
        'postImg',
        'content',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'login', 'email', 'userImg'],
        },
        {
          model: Tag,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }
}
