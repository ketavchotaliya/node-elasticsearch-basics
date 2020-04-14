import { NextFunction, Request, Response } from 'express';
import { createValidationResponse } from '../../utils/helper';
import { isEmpty, isLength } from '../../utils/validator';

class ElasticSearchValidator {
  public createIndex(req: Request, res: Response, next: NextFunction) {
    const errors: any = {};
    const { indexName } = req.body;

    // validation for org_name key
    if (isEmpty(indexName)) {
      errors.indexName = res.__('VALIDATIONS.index_name.required');
    } else if (!isLength(indexName, { min: 1, max: 250 })) {
      errors.indexName = res.__('VALIDATIONS.index_name.valid_length');
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }
}

export default new ElasticSearchValidator();
