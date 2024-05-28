import { Test, TestingModule } from '@nestjs/testing';
import { ScriptureService } from './scripture.service';

describe('ScriptureService', () => {
  let service: ScriptureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScriptureService],
    }).compile();

    service = module.get<ScriptureService>(ScriptureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
