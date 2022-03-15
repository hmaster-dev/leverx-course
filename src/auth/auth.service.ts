import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../user/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async login(user: UserEntity) {
    return {
      token: sign(
        {
          id: user.id,
          email: user.email,
        },
        this.configService.get('JWT_SECRET'),
        { expiresIn: this.configService.get('JWT_EXPIRE_TIME') },
      ),
    };
  }

  async googleCallback(data) {
    if (!data.user) {
      throw new BadRequestException();
    }

    let user: UserEntity = await this.userService.getUserBy({
      googleId: data.user.id,
    });
    if (user) {
      return this.login(user);
    }

    user = await this.userService.getUserBy({ email: data.user.email });
    if (user) {
      throw new ForbiddenException(
        "User already exists, but Google account was not connected to user's account",
      );
    }

    try {
      const newUser = new CreateUserDto();
      newUser.googleId = data.user.id;
      newUser.email = data.user.email;
      newUser.firstName = data.user.firstName;
      newUser.lastName = data.user.lastName;
      newUser.avatar = data.user.avatar;

      const registeredUser: UserEntity = await this.userService.createUser(
        newUser,
      );
      return this.login(registeredUser);
    } catch (e) {
      throw new Error(e);
    }
  }
}
