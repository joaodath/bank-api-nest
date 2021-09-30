import { Test, TestingModule } from '@nestjs/testing';
import { BankclientService } from './bankclient.service';

describe('BankclientService', () => {
  let service: BankclientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankclientService],
    }).compile();

    service = module.get<BankclientService>(BankclientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
