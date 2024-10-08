import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from '../../db/models';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/chat/:id')
  findAllUsers(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
    return this.usersService.findAllUsers(id);
  }

  @Get(':id')
  findUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findUserById(id);
  }
}
