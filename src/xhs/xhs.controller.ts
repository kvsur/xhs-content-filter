import { Controller, Get, Query } from '@nestjs/common';
import { XhsService } from './xhs.service';

@Controller('/xhs')
export class XhsController {
  constructor(private readonly xhsService: XhsService) {}

  @Get('/format')
  async getPageContent(@Query('url') url: string) {
    return this.xhsService.getPageContent(url);
  }
}
