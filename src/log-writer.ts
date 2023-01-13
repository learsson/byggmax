import { existsSync, fstat, mkdirSync } from 'fs';
import { appendFile, readFile, writeFile } from 'fs/promises';
import path from 'path';

export type OutputFormat = 'csv' | 'txt' | 'json';

interface LogData {
  siteName: string;
  url: string;
  title?: string;
  price?: string;
  date?: string;
}

export const fileWriter = async (
  logObject: LogData,
  type: OutputFormat = 'csv',
): Promise<void> => {
  const directoryName = 'output';
  const fileName = `output.${type}`;

  if (!existsSync(path.resolve(__dirname, '..', directoryName))) {
    mkdirSync(path.resolve(__dirname, '..', directoryName));
  }

  logObject.date = new Date().toISOString();

  if (type === 'json') {
    updateJson(
      {
        date: logObject.date,
        siteName: logObject.siteName,
        url: logObject.url,
        title: logObject.title,
        price: logObject.price,
      },
      directoryName,
      fileName,
    );
  } else {
    const data = `${logObject.date};${logObject.siteName};${logObject.url};${logObject.title};${logObject.price}\n`;

    await appendFile(
      path.resolve(__dirname, '..', directoryName, fileName),
      data,
      {
        encoding: 'utf-8',
      },
    );
  }
};

const updateJson = async (
  logObject: LogData,
  directoryName: string,
  fileName: string,
) => {
  if (existsSync(path.resolve(__dirname, '..', directoryName, fileName))) {
    const existingData = await readFile(
      path.resolve(__dirname, '..', directoryName, fileName),
    );
    const existingJson: LogData[] = JSON.parse(existingData.toString());
    existingJson.push(logObject);

    await writeFile(
      path.resolve(__dirname, '..', directoryName, fileName),
      JSON.stringify(existingJson),
      { encoding: 'utf-8' },
    );
  } else {
    const data = [logObject];
    await writeFile(
      path.resolve(__dirname, '..', directoryName, fileName),
      JSON.stringify(data),
      { encoding: 'utf-8' },
    );
  }
};
