import * as puppeteer from 'puppeteer';

const urls: string[] = [
  'https://www.byggmax.se/regel-95x95-p08195095',
  'https://www.byggmax.se/28x120-trall-impregnerad-gr%C3%B6n-p08728120',
];

//document.getElementsByClassName('price-wrapper')[0].innerText

const scrape = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.79 Safari/537.36',
  );

  await page.goto(url);

  const title = await page.evaluate(
    () => document.querySelector('title')?.innerHTML,
  );
  const price = await page.evaluate(() => {
    const priceEl = document.querySelector('#maincontent *> .price');
    const priceOreEl = priceEl?.querySelector('.cents-label');

    return priceEl?.innerHTML + ',' + priceOreEl?.innerHTML;
  });

  console.log(`${title}: ${price}`);
  page.close();
  browser.close();
};
for (const url of urls) {
  scrape(url);
}
