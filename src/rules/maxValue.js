import { validationFactory, successResult, errorResult } from 'core';

const maxValue = (cfg) => {
  const defaultCfg = {
    value: 1,
    message: 'O valor máximo é {value}'
  };

  const finalCfg = Object.assign({}, defaultCfg);

  if (typeof(cfg) === 'number') {
    finalCfg.value = cfg;
  } else if(typeof(cfg) === 'object') {
    Object.assign(finalCfg, cfg);
  }

  return validationFactory('maxValue', (value) => {
    if (value === null || value === undefined || value === '') {
      return successResult();
    }

    if (isNaN(parseInt(value, 10))) {
      return errorResult("O valor informádo necessita ser um número.");
    }

    if (value > finalCfg.value) {
      return errorResult(finalCfg.message.replace('{value}', finalCfg.value+''));
    }

    return successResult();
  });
};

export default maxValue;