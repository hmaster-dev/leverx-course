import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RecordEntity } from './record.entity';
import { RecordService } from './record.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRecordDto } from './dto/createRecord.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreateReviewDto } from '../review/dto/createReview.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { ReviewEntity } from '../review/review.entity';

@ApiTags('Пластинки')
@Controller('records')
export class RecordContoller {
  constructor(private readonly recordService: RecordService) {}

  @ApiOperation({ summary: 'Получить все пластинки' })
  @ApiQuery({ name: 'sort', required: false })
  @Get()
  async getAllRecords(@Query('sort') sort): Promise<RecordEntity[]> {
    return await this.recordService.getAllRecords(sort);
  }

  @ApiOperation({ summary: 'Получить пластинку по id' })
  @Get('get/:id')
  async getRecordById(@Param('id') id: number): Promise<RecordEntity> {
    return await this.recordService.getRecordById(id);
  }

  @ApiOperation({ summary: 'Создание пластинки' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateRecordDto })
  @ApiBearerAuth('TOKEN')
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          console.log(randomName);
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createRecord(
    @Body() createRecordDto: CreateRecordDto,
    @UploadedFile() image,
  ): Promise<RecordEntity> {
    return await this.recordService.createRecord(createRecordDto, image.path);
  }

  @ApiOperation({ summary: 'Поиск пластинки по названию и автору' })
  @Get('search')
  async searchRecords(@Query('q') query: string): Promise<any[]> {
    return await this.recordService.searchRecords(query);
  }

  @ApiOperation({ summary: 'Создание отзыва' })
  @ApiBody({ type: CreateReviewDto })
  @ApiBearerAuth('TOKEN')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @Post(':id/review')
  async createAuhtor(
    @User('id') userId: number,
    @Param('id') id: number,
    @Body()
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewEntity> {
    return await this.recordService.createReview(userId, id, createReviewDto);
  }

  @ApiOperation({ summary: 'Покупка пластинки' })
  @ApiBearerAuth('TOKEN')
  @Post(':id/purchase')
  @UseGuards(AuthGuard)
  async createCharge(
    @User('id') userId: number,
    @Param('id') id: number,
    @User('stripeCustomerId') stripeCustomerId: string,
  ) {
    return await this.recordService.createCharge(id, userId, stripeCustomerId);
  }
}
