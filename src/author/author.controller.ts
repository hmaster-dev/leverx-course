import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { AuthorEntity } from './author.entity';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('Авторы')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({ summary: 'Получить всех авторов' })
  @Get()
  async getAllAuthors(): Promise<AuthorEntity[]> {
    return await this.authorService.getAllAuthors();
  }

  @ApiOperation({ summary: 'Получить автора по id' })
  @Get(':id')
  async getAuthorById(@Param('id') id: number): Promise<AuthorEntity> {
    return await this.authorService.getAuthorById(id);
  }

  @ApiOperation({ summary: 'Создание автора' })
  @ApiBody({ type: CreateAuthorDto })
  @ApiBearerAuth('TOKEN')
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminGuard)
  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorEntity> {
    return await this.authorService.createAuthor(createAuthorDto);
  }
}
