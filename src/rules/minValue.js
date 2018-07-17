import { validationFactory, successResult, errorResult } from 'core';

const minValue = (cfg) => {
  const defaultCfg = {
    value: 1,
    message: 'O valor minímo é {value}'
  };

  const finalCfg = Object.assign({}, defaultCfg);

  if (typeof(cfg) === 'number') {
    finalCfg.value = cfg;
  } else if(cfg && typeof(cfg) === 'object') {
    Object.assign(finalCfg, cfg);
  }

  return validationFactory('minValue', (value) => {
    if (value === null || value === undefined || value === '') {
      return successResult();
    }

    if (isNaN(parseInt(value, 10))) {
      return errorResult("O valor informado necessita ser um número.");
    }

    if (value < finalCfg.value) {
      return errorResult(finalCfg.message.replace('{value}', finalCfg.value+''));
    }

    return successResult();
  });
};

export default minValue;