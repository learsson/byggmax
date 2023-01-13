import { PuppeteerExtra } from 'puppeteer-extra';
import * as puppeteer from 'puppeteer';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { fileWriter, OutputFormat } from './log-writer';
import { Browser } from 'puppeteer';

export interface ScraperSiteConfigPriceSelector {
  priceElementSelector: string;
  priceFractionElementSelector?: string;
}

export interface ScraperSiteConfig {
  siteName: string;
  urls: string[];
  priceSelector: ScraperSiteConfigPriceSelector;
}

export interface ScraperOptions {
  outputType: OutputFormat;
  scrapeIntervalMS: number;
  sites: ScraperSiteConfig[];
}

export class Scraper {
  private _options: ScraperOptions;
  private _puppeteer: PuppeteerExtra;

  constructor(options: ScraperOptions) {
    if (!options) {
      throw new Error('No options supplied');
    } else {
      this._options = options;
    }
    this._puppeteer = new PuppeteerExtra(puppeteer);
    this._puppeteer.use(StealthPlugin());
  }

  private _scrape = async (
    url: string,
    selector: ScraperSiteConfigPriceSelector,
    siteName: string,
  ): Promise<void> => {
    const browser = await this._puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url);
    console.info(`Scraping site ${siteName}: ${url}`);

    await page.waitForSelector(selector.priceElementSelector);
    if (selector.priceFractionElementSelector) {
      await page.waitForSelector(selector.priceFractionElementSelector);
    }

    const title = await page.evaluate(
      () => document.querySelector('title')?.innerHTML,
    );

    const price = await page.evaluate((s) => {
      const priceEl: HTMLElement | null = document.querySelector(
        s.priceElementSelector,
      );

      let priceFractionEl: HTMLElement | null = null;

      if (s.priceFractionElementSelector) {
        priceFractionEl = document.querySelector(
          s.priceFractionElementSelector,
        );
      }

      if (priceEl) {
        if (priceFractionEl) {
          return `${parseInt(priceEl.innerText, 10)}.${parseInt(
            priceFractionEl.innerText,
            10,
          )}`;
        }
        return `${parseInt(priceEl.innerText, 10)}`;
      }
    }, selector);

    const logObject = { siteName, url, title, price };

    await fileWriter(logObject);

    page.close();
    browser.close();
  };

  public scrape = () => {
    for (const site of this._options.sites) {
      for (const url of site.urls) {
        setInterval(() => {
          this._scrape(url, site.priceSelector, site.siteName);
        }, this._options.scrapeIntervalMS);
      }
    }
  };
}
