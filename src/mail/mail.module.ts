import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
    imports: [MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'nasirullayevo7@gmail.com',
            pass: 'smenmggcgonbqmwl'
          },
        },
      }),],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
