import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { createResponse } from '../../utils/helper';
import logger from '../../utils/logger';
import { ESClient } from '../../server';

class ElasticSearchController {
  /**
   *
   * @param req
   * @param res
   */
  public async createIndex(req: Request, res: Response) {
    try {
      const { indexName } = req.body;

      // create elasticsearch index
      await ESClient.indices.create({
        index: indexName,
      });

      createResponse(res, HttpStatus.OK, res.__('Index.store'));
    } catch (e) {
      logger.error(__filename, 'createIndex', '', e);
      createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  public async deleteIndex(req: Request, res: Response) {
    try {
      const { indexName } = req.body;

      // create elasticsearch index
      await ESClient.indices.delete({
        index: indexName,
      });

      createResponse(res, HttpStatus.OK, res.__('Index.deleted'));
    } catch (e) {
      logger.error(__filename, 'deleteIndex', '', e);
      createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }
}

export default new ElasticSearchController();
