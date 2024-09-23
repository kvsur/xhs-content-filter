import { Test, TestingModule } from '@nestjs/testing';
import { PageContent, VideoPageContent, XhsService } from './xhs.service';

describe('XhsService', () => {
  let service: XhsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XhsService],
    }).compile();

    service = module.get<XhsService>(XhsService);
  });

  it('should be return type of normal', async () => {
    const result = await service.getPageContent(
      'http://xhslink.com/a/l1MOivL4pb8V',
    );
    expect((result as PageContent).title).toBeDefined();
  }, 60000);

  it('should be return type of video', async () => {
    const result = await service.getPageContent(
      'http://xhslink.com/a/mmxOTgvcGi8V',
    );
    expect((result as VideoPageContent).video).toBeDefined();
  }, 60000);
});
