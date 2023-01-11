import * as puppeteer from 'puppeteer';

const urls: string[] = [
  'https://www.byggmax.se/regel-95x95-p08195095',
  'https://www.byggmax.se/28x120-trall-impregnerad-gr%C3%B6n-p08728120',
];

//document.getElementsByClassName('price-wrapper')[0].innerText

const scrape = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const title = await page.evaluate(
    () => document.querySelector('title')?.innerHTML,
  );
  const priceKr = await page.evaluate(() =>
    document
      .querySelector('#maincontent *> .price')
      ?.getAttribute('textContent'),
  );
  const priceOre = await page.evaluate(() =>
    document
      .querySelector('#maincontent *>  .cents-label')
      ?.getAttribute('textContent'),
  );
  console.log(
    `${title?.toString()}: ${priceKr?.toString()},${priceOre?.toString()}`,
  );
  page.close();
  browser.close();
};
for (const url of urls) {
  scrape(url);
}
