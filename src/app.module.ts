import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './database.config';
import { RecordModule } from './record/record.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    AuthorModule,
    RecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
