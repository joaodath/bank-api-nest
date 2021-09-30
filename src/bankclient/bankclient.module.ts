import { Module } from '@nestjs/common';
import { BankclientService } from './bankclient.service';
import { BankclientController } from './bankclient.controller';

@Module({
  controllers: [BankclientController],
  providers: [BankclientService]
})
export class BankclientModule {}
