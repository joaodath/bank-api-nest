import { Test, TestingModule } from '@nestjs/testing';
import { BankclientController } from './bankclient.controller';
import { BankclientService } from './bankclient.service';

describe('BankclientController', () => {
  let controller: BankclientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankclientController],
      providers: [BankclientService],
    }).compile();

    controller = module.get<BankclientController>(BankclientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
