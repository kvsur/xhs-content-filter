import { Browser as PuppeteerBrowser, launch, executablePath } from 'puppeteer';

class Browser {
  private static instance: PuppeteerBrowser | null = null;

  public static async getInstance(): Promise<PuppeteerBrowser> {
    if (!Browser.instance || !Browser.instance.connected) {
      Browser.instance = await launch({
        headless: true,
        executablePath: executablePath(),
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          `--window-size=430,932`,
          '--mute-audio',
        ],
        defaultViewport: {
          width: 0,
          height: 0,
          isMobile: true,
        },
      });
    }
    return Browser.instance;
  }
}

export default Browser;
