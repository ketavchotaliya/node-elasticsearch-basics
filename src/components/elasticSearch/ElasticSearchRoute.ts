import ElasticSearchController from './ElasticSearchController';
import ElasticSearchValidator from './ElasticSearchValidator';
import { API_PRE_FIX_V1, ELASTICSEARCH } from '../../utils/ApiUri';

export default (app) => {
  // add new Elasticsearch Index
  app.post(
    API_PRE_FIX_V1 + ELASTICSEARCH.INDEX.CREATE,
    ElasticSearchValidator.validateIndexName,
    ElasticSearchController.createIndex
  );

  // Drop Index
  app.delete(
    API_PRE_FIX_V1 + ELASTICSEARCH.INDEX.DELETE,
    ElasticSearchValidator.validateIndexName,
    ElasticSearchController.deleteIndex
  );

  // List of Index
  app.get(API_PRE_FIX_V1 + ELASTICSEARCH.INDEX.LIST, ElasticSearchController.listIndex);

  // ========================================
  // add new Document
  app.post(
    API_PRE_FIX_V1 + ELASTICSEARCH.DOCUMENT.ADD,
    ElasticSearchValidator.validateIndexName,
    ElasticSearchValidator.validateDocumentBody,
    ElasticSearchValidator.validateDocumentId,
    ElasticSearchController.addDocument
  );

  // delete document by id
  app.delete(
    API_PRE_FIX_V1 + ELASTICSEARCH.DOCUMENT.DELETE,
    ElasticSearchValidator.validateIndexName,
    ElasticSearchValidator.validateDocumentId,
    ElasticSearchController.deleteDocumentById
  );
};
