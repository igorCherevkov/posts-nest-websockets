import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Post, Tag, User } from '../../db/models';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findUser(email: string): Promise<User> {
    return await this.userModel.findOne({
      where: { email },
    });
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userModel.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userModel.findOne({
      where: { id },
      order: [['posts', 'created_at', 'DESC']],
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Post,
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
              model: Tag,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }
}
