import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users.service';
import { RequestingData, ReturningData } from '../types/types';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'db/models';
import { registrationDto } from '../dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async registration(user: registrationDto): Promise<ReturningData> {
    const checkLogin = await this.userModel.findOne({
      where: { login: user.login },
    });

    const checkEmail = await this.userModel.findOne({
      where: { email: user.email },
    });

    if (checkLogin) throw new Error('login already exists');
    if (checkEmail) throw new Error('email already exists');

    const hashPassword = await bcrypt.hash(user.password, 5);
    const newUser = await this.userModel.create({
      login: user.login,
      email: user.email,
      password: hashPassword,
    });

    const token = await this.generateToken({
      id: newUser.id,
      email: newUser.email,
      login: newUser.login,
      userImg: newUser.userImg,
    });

    return {
      ...token,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const checkUser = await this.usersService.findUser(email);

    const passwordsIsMatch = await bcrypt.compare(password, checkUser.password);

    if (checkUser && passwordsIsMatch) {
      return checkUser;
    }

    throw new BadRequestException('user or password are incorrect');
  }

  async generateToken(user: RequestingData): Promise<ReturningData> {
    const { id, email, login, userImg } = user;

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      login: user.login,
      userImg: user.userImg,
    });

    return {
      id,
      email,
      login,
      userImg,
      token,
    };
  }
}
