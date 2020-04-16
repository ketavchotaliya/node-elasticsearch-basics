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

  // get document by id
  app.get(
    API_PRE_FIX_V1 + ELASTICSEARCH.DOCUMENT.GET_BY_ID,
    ElasticSearchValidator.validateIndexName,
    ElasticSearchValidator.validateDocumentId,
    ElasticSearchController.getDocumentById
  );

  // update document by id
  app.put(
    API_PRE_FIX_V1 + ELASTICSEARCH.DOCUMENT.UPDATE,
    ElasticSearchValidator.validateIndexName,
    ElasticSearchValidator.validateDocumentId,
    ElasticSearchValidator.validateDocumentBody,
    ElasticSearchController.updateDocumentById
  );
  
  // delete document by id
  app.delete(
    API_PRE_FIX_V1 + ELASTICSEARCH.DOCUMENT.DELETE,
    ElasticSearchValidator.validateIndexName,
    ElasticSearchValidator.validateDocumentId,
    ElasticSearchController.deleteDocumentById
  );
  
  // delete document by query
  app.delete(
    API_PRE_FIX_V1 + ELASTICSEARCH.DOCUMENT.DELETE_BY_QUERY,
    ElasticSearchValidator.validateIndexName,
    ElasticSearchValidator.validateDocumentQuery,
    ElasticSearchController.deleteDocumentByQuery
  );
  
  // bulk index the document
  app.post(
    API_PRE_FIX_V1 + ELASTICSEARCH.DOCUMENT.BULK_INDEX,
    ElasticSearchValidator.validateIndexName,
    ElasticSearchController.bulkIndexDocument
  );
};
