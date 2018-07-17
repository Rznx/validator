import { isArray } from 'utils';

// export const required = (cfg) => {
//   const defaultCfg = {
//     message: 'O campo é obrigatório',
//     searchId: null,
//     richText: null,
//     onlyIf: (value, data) => true,
//   };

//   const finalCfg = Object.assign({}, defaultCfg, cfg);

//   return validationFactory('required', (value, data) => {
//     let finalValue = (finalCfg.searchId ? data[finalCfg.searchId] : value);

//     if (!finalCfg.onlyIf(finalValue, data)) {
//       return successResult();
//     }

//     if (isArray(finalValue) && isEmpty(finalValue)) {
//       return errorResult(finalCfg.message);
//     }
//     if (finalCfg.richText) {
//       const emptyRichText1 = '<p><br></p>';
//       const emptyRichText2 = '<p></p>';

//       if (finalValue === emptyRichText1 || finalValue === emptyRichText2) {
//         finalValue = '';
//       }
//     }
    
//     const checkValue = (value) =>
//       value !== null && value !== undefined && value !== '';

//     return (
//       checkValue(finalValue)
//         ? successResult()
//         : errorResult(finalCfg.message));
//   });
// };

// export const strLength = (cfg) => {
//   const defaultCfg = {
//     minLength: null,
//     minMessage: 'O campo deve ter ao menos {value} caracteres',
//     maxLength: null,
//     maxMessage: 'O campo deve ter no máximo {value} caracteres'
//   };

//   const finalCfg = Object.assign({}, defaultCfg, cfg);

//   return validationFactory('strLength', (value) => {

//     if (value !== null && value !== undefined) {
//       const strValue = value+'';

//       if (finalCfg.minLength && !isNaN(parseInt(finalCfg.minLength, 10))) {
//         if (strValue.length < finalCfg.minLength) {
//           return errorResult(finalCfg.minMessage.replace('{value}', finalCfg.minLength));
//         }
//       }

//       if (finalCfg.maxLength && !isNaN(parseInt(finalCfg.maxLength, 10))) {
//         if (strValue.length > finalCfg.maxLength) {
//           return errorResult(finalCfg.maxMessage.replace('{value}', finalCfg.maxLength));
//         }
//       }
//     }

//     return successResult();
//   });
// };

// export const minValue = (cfg) => {
//   const defaultCfg = {
//     value: 1,
//     message: 'O valor minímo é {value}'
//   };

//   const finalCfg = Object.assign({}, defaultCfg);

//   if (typeof(cfg) === 'number') {
//     finalCfg.value = cfg;
//   } else if(cfg && typeof(cfg) === 'object') {
//     Object.assign(finalCfg, cfg);
//   }

//   return validationFactory('minValue', (value) => {
//     if (value === null || value === undefined || value === '') {
//       return successResult();
//     }

//     if (isNaN(parseInt(value, 10))) {
//       return errorResult("O valor informado necessita ser um número.");
//     }

//     if (value < finalCfg.value) {
//       return errorResult(finalCfg.message.replace('{value}', finalCfg.value+''));
//     }

//     return successResult();
//   });
// }

// export const maxValue = (cfg) => {
//   const defaultCfg = {
//     value: 1,
//     message: 'O valor máximo é {value}'
//   };

//   const finalCfg = Object.assign({}, defaultCfg);

//   if (typeof(cfg) === 'number') {
//     finalCfg.value = cfg;
//   } else if(typeof(cfg) === 'object') {
//     Object.assign(finalCfg, cfg);
//   }

//   return validationFactory('maxValue', (value) => {
//     if (value === null || value === undefined || value === '') {
//       return successResult();
//     }

//     if (isNaN(parseInt(value, 10))) {
//       return errorResult("O valor informádo necessita ser um número.");
//     }

//     if (value > finalCfg.value) {
//       return errorResult(finalCfg.message.replace('{value}', finalCfg.value+''));
//     }

//     return successResult();
//   });
// }

// export const email = (cfg) => {
//   const defaultCfg = {
//     message: 'O e-mail não é válido'
//   };

//   const regex = /^[a-z0-9\u007F-\uffff!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

//   const finalCfg = Object.assign({}, defaultCfg, cfg);

//   return validationFactory('email', (value) => {
//     if (value !== null && value !== undefined && value !== '') {
//       if (!regex.exec(value)) {
//         return errorResult(finalCfg.message);
//       }
//     }

//     return successResult();
//   });
// };

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

// export const formValidator = (rules) => {
//   return (data) => {
//     const validReturn = doValidation(data, rules);
//     return validReturn;
//   };
// }
