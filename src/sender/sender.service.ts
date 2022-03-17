import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class SenderService {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('purchase.created', { async: true })
  async handleOrderCreatedEvent(payload) {
    console.log(payload);
    await this.send(payload.email, 'Purchase records', 'Some text of mail');
  }

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
