import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { SenderService } from './sender.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.example.com',
          port: 587,
          secure: false,
          auth: {
            user: 'username',
            pass: 'password',
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
      }),
    }),
  ],
  providers: [SenderService],
})
export class SenderModule {}
