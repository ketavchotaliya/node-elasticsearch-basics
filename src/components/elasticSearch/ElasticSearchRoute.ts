import ElasticSearchController from './ElasticSearchController';
import ElasticSearchValidator from './ElasticSearchValidator';
import { API_PRE_FIX_V1, ELASTICSEARCH } from '../../utils/ApiUri';

export default (app) => {
  // add new Elasticsearch Index
  app.post(
    API_PRE_FIX_V1 + ELASTICSEARCH.INDEX.CREATE,
    ElasticSearchValidator.createIndex,
    ElasticSearchController.createIndex
  );
  
  // Drop Index
  app.delete(
    API_PRE_FIX_V1 + ELASTICSEARCH.INDEX.CREATE,
    ElasticSearchValidator.createIndex,
    ElasticSearchController.deleteIndex
  );
};
