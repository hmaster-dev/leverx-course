import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SenderService {
  constructor(private readonly mailerService: MailerService) {}

  send(email: string, subject: string, message: string): void {
    this.mailerService
      .sendMail({
        to: email,
        from: 'noreply@nestjs.com',
        subject: subject,
        text: message,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
