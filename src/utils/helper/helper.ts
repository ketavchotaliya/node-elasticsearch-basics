import { Request, Response } from 'express';
import { readFile } from 'fs';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { PAGE_NUMBER, RECORDS_PER_PAGE, SORT_BY, SORT_ORDER } from '../constants';
import logger from '../logger';
import hbs from 'handlebars';

/**
 * @description Create Response
 * @param {Object} res
 * @param {Number} status
 * @param {String} message
 * @param {Object} payload
 * @param {Object} pager
 */
export const createResponse = (
  res: Response,
  status: number,
  message: string,
  payload: object = {},
  pager: object = {},
  header: object = {}
) => {
  const resPager: object = typeof pager !== 'undefined' ? pager : {};

  return res
    .status(status)
    .set(header)
    .json({
      status,
      message,
      payload,
      pager: resPager
    });
};

/**
 * @description Send Validation Response
 * @param {Object} res
 * @param {errors} errors - Errors Object
 *
 * @return {*|Sequelize.json|Promise<any>}
 */
export const createValidationResponse = (res: Response, errors: any) => {
  return createResponse(
    res,
    HttpStatus.UNPROCESSABLE_ENTITY,
    errors[Object.keys(errors)[0]],
    { error: errors[Object.keys(errors)[0]] },
    {}
  );
};

/**
 * decode JWT token
 * @param JWT token
 */
export const decodedJWTToken = (token: string) => {
  try {
    const tokenString = typeof token.split(' ')[1] === 'undefined' ? token : token.split(' ')[1];
    return jwt.decode(tokenString);
  } catch (err) {
    return false;
  }
};

/**
 * It will return random value between min and max value.
 *
 * @return {number}
 */
export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getSortOrder = (req: Request) => {
  const sortOrder = req.body.sortOrder || req.query.sortOrder;
  return typeof sortOrder !== 'undefined' ? sortOrder : SORT_ORDER;
};

export const getSortBy = (req: Request) => {
  const sortBy = req.body.sortBy || req.query.sortBy;
  return typeof sortBy !== 'undefined' ? sortBy : SORT_BY;
};

export const getPageNumber = (req: Request) => {
  let pageNumber = req.body.pageNumber || req.query.pageNumber;
  pageNumber = typeof pageNumber !== 'undefined' && !isNaN(pageNumber) ? Number(pageNumber) : PAGE_NUMBER;

  return pageNumber > 0 ? pageNumber : PAGE_NUMBER;
};

export const getRecordsPerPage = (req: Request) => {
  const recordsPerPage = req.body.recordsPerPage || req.query.recordsPerPage || req.body.pageSize || req.query.pageSize;
  return typeof recordsPerPage !== 'undefined' && !isNaN(recordsPerPage) ? Number(recordsPerPage) : RECORDS_PER_PAGE;
};

export const randomStr = (length: number) => {
  const possible = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomText = '';
  let i;

  for (i = 0; i < length; i++) {
    randomText += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return randomText;
};

export const getObjectKeys = (obj: object) => {
  try {
    return Object.keys(obj);
  } catch (err) {
    logger.error(__filename, 'getObjectKeys', '', 'Error in getObjectKeys', JSON.stringify(err.stack));
    throw err;
  }
};

export const findDuplicatesArray = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) != index);
};

/**
 *
 * @param path
 */
export const readHTMLFile = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, { encoding: 'utf-8' }, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};
export const compileTemplate = (str: string, obj: Object) => {
  try {
    let template = hbs.compile(str);
    return template(obj);
  } catch (e) {
    throw e;
  }
};

export const shuffleString = (value) => {
  return value
    .split('')
    .sort(() => {
      return 0.5 - Math.random();
    })
    .join('');
};

export const find_Nth_ocurrence = (str: string, needle: string, nth: number) => {
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) == needle) {
      if (!--nth) {
        return i;
      }
    }
  }
  return false;
};

export const getSubString = (str: string, startPosition: number, endPosition: number) => {
  return str.substring(startPosition, endPosition);
};
