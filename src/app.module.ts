import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './database.config';
import { RecordModule } from './record/record.module';
import { GoogleStrategy } from './auth/guards/google.strategy';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';
import { ReviewModule } from './review/review.module';
import { StripeModule } from 'nestjs-stripe';
import { SenderModule } from './sender/sender.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/${process.env.NODE_ENV}.env`,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('stripe_key'),
        apiVersion: '2020-08-27',
      }),
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    AuthModule,
    AuthorModule,
    RecordModule,
    ReviewModule,
    SenderModule,
  ],
  controllers: [],
  providers: [GoogleStrategy],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
