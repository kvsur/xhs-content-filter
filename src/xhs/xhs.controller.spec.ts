import { Test, TestingModule } from '@nestjs/testing';
import { XhsController } from './xhs.controller';

describe('XhsController', () => {
  let controller: XhsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XhsController],
    }).compile();

    controller = module.get<XhsController>(XhsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
