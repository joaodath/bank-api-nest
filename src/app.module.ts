import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankclientModule } from './bankclient/bankclient.module';

@Module({
  imports: [BankclientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
