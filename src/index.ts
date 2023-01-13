import { Scraper, ScraperOptions } from './scraper';
import { server } from './server';
import dotenv from 'dotenv';

dotenv.config();

const scraperOptions: ScraperOptions = {
  outputType: 'json',
  scrapeIntervalMS: 1200000,
  sites: [
    {
      siteName: 'byggmax',
      priceSelector: {
        priceElementSelector: '#maincontent *> .price',
        priceFractionElementSelector: '#maincontent *> .cents-label',
      },
      urls: [
        'https://www.byggmax.se/regel-95x95-p08195095',
        'https://www.byggmax.se/28x120-trall-impregnerad-gr%C3%B6n-p08728120',
      ],
    },
    {
      siteName: 'k-rauta',
      priceSelector: {
        priceElementSelector: '.price-view__sale-price-container',
      },
      urls: [
        'https://www.k-rauta.se/produkt/byggregel-45x220-54m-c24-obehandlad/7340039705716',
      ],
    },
  ],
};

const scraper: Scraper = new Scraper(scraperOptions);

if (scraperOptions.outputType === 'json') {
  server.listen(process.env.PORT, () => {
    console.log(`API is running at http://localhost:${process.env.PORT}`);
    console.log(
      `Access price list on http://localhost:${process.env.PORT}/price-list`,
    );
    console.log('Press CTRL-C to stop\n');
  });
}

scraper.scrape();
