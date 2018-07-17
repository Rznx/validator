import { validationFactory, successResult, errorResult } from 'core';

const strLength = (cfg) => {
  const defaultCfg = {
    minLength: null,
    minMessage: 'O campo deve ter ao menos {value} caracteres',
    maxLength: null,
    maxMessage: 'O campo deve ter no máximo {value} caracteres'
  };

  const finalCfg = Object.assign({}, defaultCfg, cfg);

  return validationFactory('strLength', (value) => {

    if (value !== null && value !== undefined) {
      const strValue = value+'';

      if (finalCfg.minLength && !isNaN(parseInt(finalCfg.minLength, 10))) {
        if (strValue.length < finalCfg.minLength) {
          return errorResult(finalCfg.minMessage.replace('{value}', finalCfg.minLength));
        }
      }

      if (finalCfg.maxLength && !isNaN(parseInt(finalCfg.maxLength, 10))) {
        if (strValue.length > finalCfg.maxLength) {
          return errorResult(finalCfg.maxMessage.replace('{value}', finalCfg.maxLength));
        }
      }
    }

    return successResult();
  });
};

export default strLength;