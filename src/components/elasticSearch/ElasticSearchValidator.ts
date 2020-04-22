import { NextFunction, Request, Response } from 'express';
import { createValidationResponse } from '../../utils/helper';
import { isEmpty, isLength, isNumber } from '../../utils/validator';

class ElasticSearchValidator {
  public validateIndexName(req: Request, res: Response, next: NextFunction) {
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

  public validateMappingObject(req: Request, res: Response, next: NextFunction) {
    const errors: any = {};
    const { mappingObject } = req.body;

    // validation for mappingObject key
    if (isEmpty(mappingObject)) {
      errors.mappingObject = res.__('VALIDATIONS.mappingObject.required');
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }

  public validateDocumentBody(req: Request, res: Response, next: NextFunction) {
    const errors: any = {};
    const { documentBody } = req.body;

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

  public validateDocumentQuery(req: Request, res: Response, next: NextFunction) {
    const errors: any = {};
    const { documentQuery } = req.body;

    // validation for documentQuery key
    if (isEmpty(documentQuery)) {
      errors.documentQuery = res.__('VALIDATIONS.documentQuery.required');
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }

  public validateDocumentId(req: Request, res: Response, next: NextFunction) {
    const errors: any = {};
    const documentId = req.body.documentId || req.params.documentId || req.query.documentId;

    // validation for documentId key
    if (isEmpty(documentId)) {
      errors.documentId = res.__('VALIDATIONS.documentId.required');
    } else if (!isNumber(documentId)) {
      errors.documentId = res.__('VALIDATIONS.documentId.numeric');
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }
}

export default new ElasticSearchValidator();
