import {
  Injectable,
  OnApplicationShutdown,
  OnApplicationBootstrap,
} from '@nestjs/common';
import Browser from '../util/browser';
import { Page } from 'puppeteer';

export interface BasePageContent {
  desc: string;
  type: 'normal' | 'video';
}

export interface PageContent extends BasePageContent {
  images: string[];
  title: string;
}

export interface VideoPageContent extends BasePageContent {
  video: string;
}

@Injectable()
export class XhsService
  implements OnApplicationShutdown, OnApplicationBootstrap
{
  async onApplicationBootstrap() {
    await Browser.getInstance();
  }

  async onApplicationShutdown(signal?: string) {
    await Browser.getInstance()
      .then((browser) => browser.close())
      .catch((err) => {
        console.error(err);
      });
  }

  private async getNormalPageContent(page: Page): Promise<PageContent> {
    const images = await page.$$eval('div.note-image-box img', (imgs) =>
      imgs.map((img) => img.getAttribute('src')),
    );

    const title = await page.$eval('div.reds-text.fs18.fw500.title', (el) =>
      el.textContent.trim(),
    );
    const desc = await page.$eval('div.reds-text.fs16.desc', (el) =>
      el.textContent.trim(),
    );

    await page.close();

    return { images, title, desc, type: 'normal' };
  }

  private async getVideoPageContent(page: Page): Promise<VideoPageContent> {
    const video = await page.$eval('video', (el) => el.getAttribute('src'));
    const desc = await page.$eval('div.reds-text.fs15.author-desc', (el) =>
      el.textContent.trim().replace(/^展开/, ''),
    );
    await page.close();
    return { video, desc, type: 'video' };
  }

  async getPageContent(simpleUrl: string): Promise<BasePageContent> {
    const browser = await Browser.getInstance();
    const page = await browser.newPage();
    const userAgent =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1';
    await page.setUserAgent(userAgent);
    try {
      await page.goto(simpleUrl, {
        waitUntil: 'load',
        // timeout: 1000 * 30,
      });
      // Wait for the redirection to complete
      const redirectedUrl = page.url();
      const urlParams = new URLSearchParams(new URL(redirectedUrl).search);
      const type = urlParams.get('type');

      switch (type) {
        case 'video':
          return this.getVideoPageContent(page);
        case 'normal':
          return this.getNormalPageContent(page);
        default:
          return this.getNormalPageContent(page);
      }
    } catch (error) {
      try {
        await page.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
