# Advanced usage

## Setup multiple site scraping

Configurate several sites accordingly.
Ths `priceSelector` must be found out for each site and tested.

```
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
```

## Activating API

The config object has a `outputType` option. The different output types are

```
export type OutputFormat = 'csv' | 'txt' | 'json';
```

If you choose `json` as output format an API server is automatically started and exposes an endpoint, `/price-list` on localhost port `3000` as default, this can be customized in the `.env` file. Every other output type just creates and appends to a regular file. The output is located at `\output\`

## Scrape interval

In the config there is a `scrapeIntervalMS` option. When the scraper starts it automatically sets up a intervall for how often it will scrape the configured sites.
