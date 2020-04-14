'use strict';

import express from 'express';
import uuid from 'uuid';

class RequestUUID {
  public init(app: express.Application) {
    app.use((req, res, next) => {
      if (typeof req['uuid'] === 'undefined') {
        req['uuid'] = uuid();
      }
      next();
    });
  }
}

export const reqUuid = new RequestUUID();
