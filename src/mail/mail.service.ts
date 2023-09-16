import { MailerService } from '@nestjs-modules/mailer/dist';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService){}
  async sendMail(email:string, html:string) {
    await this.mailerService.sendMail({
      from: 'nasirullayevo7@gmail.com',
      to: email,
      subject: 'Verification code',
      context: { name: 'Your verification code'},
      html: html
    })
  }
}