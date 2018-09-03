import { isArray } from 'utils';

export const validator = (data, options) => {
  const globalFormKey  = '_global_form';
  const globalErrorKey = '_error';
  const returnObject = {};

  let validatorFn = null;
  let validateReturn = null;
  let validateParams = null;
  let validateErrorKey = null;

  Object.keys(options).forEach((kOpts) => {
    let validationRules = options[kOpts];

    if ('function' === typeof options[kOpts]) {
      validationRules = options[kOpts].call(null, data[kOpts], data);
    }

    if (isArray(validationRules) && validationRules.length) {
      for (var i = 0; i < validationRules.length; i++) {
        validatorFn     = validationRules[i];
        validateParams  = [data[kOpts], data];
        validateErrorKey = kOpts

        if (kOpts === globalFormKey) {
          validateErrorKey = globalErrorKey;
          validateParams.shift();
        }

        validateReturn = validatorFn.apply(null, validateParams);

        if (!validateReturn.valid) {
          returnObject[validateErrorKey] = validateReturn.errorMessage;
          break;
        }
      }
    }
  });

  if (Object.keys(returnObject).length === 0) {
    return null;
  }

  return returnObject;
}

export default validator;
