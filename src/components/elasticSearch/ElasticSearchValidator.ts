import { NextFunction, Request, Response } from 'express';
import { createValidationResponse } from '../../utils/helper';
import { isEmpty, isLength, isNumber } from '../../utils/validator';

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

  public addDocument(req: Request, res: Response, next: NextFunction) {
    const errors: any = {};
    const { documentId, documentBody } = req.body;

    // validation for documentId key
    if (isEmpty(documentId)) {
      errors.documentId = res.__('VALIDATIONS.documentId.required');
    } else if (!isNumber(documentId)) {
      errors.documentId = res.__('VALIDATIONS.documentId.numeric');
    }

    // validation for documentBody key
    if (isEmpty(documentBody)) {
      errors.documentBody = res.__('VALIDATIONS.documentBody.required');
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }
}

export default new ElasticSearchValidator();
