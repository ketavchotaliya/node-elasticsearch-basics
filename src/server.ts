import { config } from 'dotenv';
import { createServer } from 'http';
import { resolve } from 'path';
import { Client } from '@elastic/elasticsearch';

export const BASE_PATH: string = __dirname;

config({ path: resolve(__dirname + '/../.env') });

import app from './app';
import logger from './utils/logger';

app.set('view engine', 'hbs');

const port: string | number = process.env.PORT || 8080;

const server = createServer(app);

// create ES Client object
const ES_Host: string = process.env.ES_HOST || 'http://localhost:9200';

const ESClient = new Client({ node: ES_Host });

server.listen(port, () => {
  logger.info(__filename, ``, ``, ``, `Server is running on ${port}`);
});

function exitHandler() {
  logger.info(__filename, 'Server', '', `Closing http server.`, '');
  server.close(() => {
    logger.info(__filename, 'Server', '', `Http server closed.`, '');
  });
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  (process as NodeJS.EventEmitter).on(eventType, exitHandler.bind(null, eventType));
});
