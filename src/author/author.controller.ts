import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthorService } from './author.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { AuthorEntity } from './author.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Авторы')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({ summary: 'Получить всех авторов' })
  @ApiResponse({ status: 200 })
  @Get()
  @UseGuards(AuthGuard('google'))
  async getAllAuthors(): Promise<AuthorEntity[]> {
    return await this.authorService.getAllAuthors();
  }

  @ApiOperation({ summary: 'Получить автора по id' })
  @ApiResponse({ status: 200 })
  @Get(':id')
  async getById(@Param('id') id: number): Promise<AuthorEntity> {
    return await this.authorService.getAuthorById(id);
  }

  @ApiOperation({ summary: 'Создание автора' })
  @ApiResponse({ status: 200 })
  @ApiBody({ type: CreateAuthorDto })
  @Post()
  async createAuhtor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorEntity> {
    return await this.authorService.createAuthor(createAuthorDto);
  }
}
