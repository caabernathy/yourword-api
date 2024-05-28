import { Test, TestingModule } from '@nestjs/testing';
import { ScriptureController } from './scripture.controller';

describe('ScriptureController', () => {
  let controller: ScriptureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScriptureController],
    }).compile();

    controller = module.get<ScriptureController>(ScriptureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
