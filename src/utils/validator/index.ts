import isJSON from 'validator/lib/isJSON';
import isLength from 'validator/lib/isLength';
import isInt from 'validator/lib/isInt';
import matches from 'validator/lib/matches';
import isNumeric from 'validator/lib/isNumeric';
import isIn from 'validator/lib/isIn';
import isURL from 'validator/lib/isURL';

// Custom Validators
import {
  customRegex,
  isAlphaNumeric,
  isAlphaNumericWithSpecialChar,
  isArray,
  isArrayLength,
  isBoolean,
  isDecimalNumber,
  isEmail,
  isEmpty,
  isNumber,
  isString,
  isValidString
} from './customValidator';

export {
  // Validations
  isJSON,
  isLength,
  isInt,
  matches,
  isNumeric,
  isIn,
  isURL,
  // Custom Validations
  isEmpty,
  isValidString,
  customRegex,
  isEmail,
  isArray,
  isDecimalNumber,
  isNumber,
  isBoolean,
  isAlphaNumeric,
  isString,
  isArrayLength,
  isAlphaNumericWithSpecialChar
};
