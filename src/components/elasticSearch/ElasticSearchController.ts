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

  public async listIndex(req: Request, res: Response) {
    try {
      // list of elasticsearch index
      const indexList = await ESClient.cat.indices({
        format: 'json',
      });

      createResponse(res, HttpStatus.OK, res.__('Index.deleted'), indexList);
    } catch (e) {
      logger.error(__filename, 'deleteIndex', '', e);
      createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  public async addDocument(req: Request, res: Response) {
    try {
      const { indexName, documentId, documentBody } = req.body;

      // add ES Document
      const addDocument = await ESClient.index({
        index: indexName,
        id: documentId,
        body: documentBody,
      });

      createResponse(res, HttpStatus.OK, res.__('Document.store'), addDocument);
    } catch (e) {
      logger.error(__filename, 'addDocument', '', e);
      createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  public async bulkIndexDocument(req: Request, res: Response) {
    try {
      const { indexName } = req.body;

      // Note: We will fetch JSON file from static file path as this is a Demo project we are not doing file upload process
      // File path: /home/smartsense/Downloads/cities.json (i've thousands of city array of objects)
      const citiesData = require('/home/smartsense/Downloads/cities.json');
      let bulkData: any = [];

      // preparing Array of objects for bulk insert the documents
      citiesData.forEach((city: any) => {
        bulkData.push({
          index: {
            _index: indexName,
            _type: 'cities_list',
          },
        });
        bulkData.push(city);
      });

      // Bulk insert the documents ES Query
      const bulkIndexDocument = await ESClient.bulk({
        body: bulkData,
      });
      createResponse(res, HttpStatus.OK, res.__('Document.bulk_indexed'), bulkIndexDocument);
    } catch (e) {
      logger.error(__filename, 'bulkIndexDocument', '', e);
      createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  public async getDocumentById(req: Request, res: Response) {
    try {
      const { indexName } = req.body;
      const { documentId } = req.params;

      // get ES Document
      const documentDetails = await ESClient.get({
        index: indexName,
        id: documentId,
      });

      createResponse(res, HttpStatus.OK, res.__('Document.found'), documentDetails);
    } catch (e) {
      logger.error(__filename, 'getDocumentById', '', e);
      createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  public async updateDocumentById(req: Request, res: Response) {
    try {
      const { indexName, documentBody } = req.body;
      const { documentId } = req.params;

      // update Document
      const documentDetails = await ESClient.update({
        index: indexName,
        id: documentId,
        body: {
          doc: documentBody,
        },
      });

      createResponse(res, HttpStatus.OK, res.__('Document.update'), documentDetails);
    } catch (e) {
      logger.error(__filename, 'updateDocumentById', '', e);
      createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  public async deleteDocumentById(req: Request, res: Response) {
    try {
      const { indexName, documentId } = req.body;

      // delete ES Document
      const deleteDocument = await ESClient.delete({
        index: indexName,
        id: documentId,
      });

      createResponse(res, HttpStatus.OK, res.__('Document.deleted'), deleteDocument);
    } catch (e) {
      logger.error(__filename, 'deleteDocumentById', '', e);
      createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  public async deleteDocumentByQuery(req: Request, res: Response) {
    try {
      const { indexName, documentQuery } = req.body;

      // delete ES Document
      const deleteDocument = await ESClient.deleteByQuery({
        index: indexName,
        body: documentQuery,
      });

      createResponse(res, HttpStatus.OK, res.__('Document.deleted'), deleteDocument);
    } catch (e) {
      logger.error(__filename, 'deleteDocumentByQuery', '', e);
      createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  public async queryDSL(req: Request, res: Response) {
    try {
      const { indexName, documentQuery } = req.body;

      // Documents details
      const documents = await ESClient.search({
        index: indexName,
        body: documentQuery,
      });

      createResponse(res, HttpStatus.OK, res.__('Document.found'), documents);
    } catch (e) {
      logger.error(__filename, 'queryDSL', '', e);
      createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }
}

export default new ElasticSearchController();
