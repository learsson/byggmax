import { appendFile } from 'fs/promises';
import path from 'path';

export type OutputFormat = 'csv' | 'txt' | 'json';

export const fileWriter = async (
  logObject: { siteName: string; url: string; title?: string; price?: string },
  type: OutputFormat = 'csv',
): Promise<void> => {
  const fileName = `output.${type}`;
  const date = new Date().toISOString();
  const data =
    type === 'json'
      ? JSON.stringify({
          date,
          siteName: logObject.siteName,
          url: logObject.url,
          title: logObject.title,
          price: logObject.price,
        })
      : `${date};${logObject.siteName};${logObject.url};${logObject.title};${logObject.price}\n`;

  await appendFile(path.resolve(__dirname, '..', fileName), data, {
    encoding: 'utf-8',
  });
};
