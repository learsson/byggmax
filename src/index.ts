import { PuppeteerExtra } from 'puppeteer-extra';
import * as puppeteer from 'puppeteer';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const urls: string[] = [
  'https://www.byggmax.se/regel-95x95-p08195095',
  'https://www.byggmax.se/28x120-trall-impregnerad-gr%C3%B6n-p08728120',
];

const scrape = async (url: string) => {
  const p = new PuppeteerExtra(puppeteer);
  p.use(StealthPlugin());
  const browser = await p.launch({ headless: true });

  const page = await browser.newPage();

  await page.goto(url);

  await page.waitForSelector('#maincontent *> .price');
  await page.waitForSelector('#maincontent *> .cents-label');

  const title = await page.evaluate(
    () => document.querySelector('title')?.innerHTML,
  );
  const price = await page.evaluate(() => {
    const priceEl = document.querySelector('#maincontent *> .price');
    const priceOreEl = document.querySelector('#maincontent *> .cents-label');

    return priceEl?.innerHTML + ',' + priceOreEl?.innerHTML;
  });

  console.log(`${title}: ${price}`);
  page.close();
  browser.close();
};
for (const url of urls) {
  scrape(url);
}
