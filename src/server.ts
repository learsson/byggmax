import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { readFile } from 'fs/promises';
import path from 'path';
export const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.json({});
});

server.get('/price-list', async (req, res) => {
  const priceList = await readFile(
    path.resolve(__dirname, '..', 'output', 'output.json'),
  );

  res.json(JSON.parse(priceList.toString()));
});

server.use(
  cors({
    origin: '*',
  }),
);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
