import { Test, TestingModule } from '@nestjs/testing';
import { HatsController } from './hats.controller';

describe('HatsController', () => {
  let controller: HatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HatsController],
    }).compile();

    controller = module.get<HatsController>(HatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
