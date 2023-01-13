import { Scraper, ScraperOptions } from './scraper';

const scraperOptions: ScraperOptions = {
  outputType: 'csv',
  scrapeIntervalMS: 5000,
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

scraper.scrape();
