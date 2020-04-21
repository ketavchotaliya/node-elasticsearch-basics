export const ELASTICSEARCH = {
  INDEX: {
    CREATE: '/elasticsearch/index/create',
    DELETE: '/elasticsearch/index/delete',
    LIST: '/elasticsearch/index/list',
  },
  DOCUMENT: {
    ADD: '/elasticsearch/document/add',
    UPDATE: '/elasticsearch/document/update/:documentId',
    DELETE: '/elasticsearch/document/delete',
    DELETE_BY_QUERY: '/elasticsearch/document/delete/by/query',
    GET_BY_ID: '/elasticsearch/document/:documentId',
    BULK_INDEX: '/elasticsearch/document/bulk/index',
    SEARCH: '/elasticsearch/document',
  },
};

export const API_PRE_FIX_V1 = '/api/v1';
