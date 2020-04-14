import elasticSearchRoute from '../components/elasticSearch/ElasticSearchRoute';

class Routes {
  public init(app) {
    elasticSearchRoute(app);
  }
}

export const routes = new Routes();
