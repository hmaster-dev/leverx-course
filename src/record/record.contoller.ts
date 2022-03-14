import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecordEntity } from './record.entity';
import { RecordService } from './record.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRecordDto } from './dto/createRecord.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Пластинки')
@Controller('records')
export class RecordContoller {
  constructor(private readonly recordService: RecordService) {}

  @ApiOperation({ summary: 'Получить все пластинки' })
  @ApiResponse({ status: 200 })
  @Get()
  async getAllRecords(): Promise<RecordEntity[]> {
    return await this.recordService.getAllRecords();
  }

  @ApiOperation({ summary: 'Получить пластинку по id' })
  @ApiResponse({ status: 200 })
  @Get(':id')
  async getRecordById(@Param('id') id: number): Promise<RecordEntity> {
    return await this.recordService.getRecordById(id);
  }

  @ApiOperation({ summary: 'Создание пластинки' })
  @ApiResponse({ status: 200 })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateRecordDto })
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
}
