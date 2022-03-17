import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { SetAdminDto } from './dto/setAdmin.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiBearerAuth('TOKEN')
  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получить пользователя по id' })
  @ApiBearerAuth('TOKEN')
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiBody({ type: CreateUserDto })
  @UsePipes(new ValidationPipe())
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Назначить админа' })
  @ApiBearerAuth('TOKEN')
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminGuard)
  @Put('admin/:id')
  async setAdmin(@Param('id') id: number): Promise<UserEntity> {
    const user: UserEntity = await this.userService.getUserById(id);
    const setAdminDto: SetAdminDto = {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      avatar: user.avatar,
      isAdmin: true,
    };
    return await this.userService.updateUser(id, setAdminDto);
  }

  @ApiOperation({ summary: 'Обновить пользователя' })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth('TOKEN')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(id, updateUserDto);
  }
}
