import * as bodyParser from 'body-parser';
import express from 'express';
import { i18n } from './i18n';
import { reqUuid } from './request-uuid';
import fileUpload from 'express-fileupload';
import cors from 'cors';

class Middlewares {
  public init(app: express.Application) {
    app.use(i18n.init);
    app.use(bodyParser.json());
    app.use(fileUpload());
    reqUuid.init(app);
    //app.options('*', cors({ optionsSuccessStatus: constants.SUCCESS }));
    app.use(cors());
  }
}

export const middlewares = new Middlewares();
