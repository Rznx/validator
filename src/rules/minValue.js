import { validationFactory, successResult, errorResult } from 'core';

const minValue = (cfg) => {
  const defaultCfg = {
    value: 1,
    message: 'Minimium value accepted is {value}'
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
      return errorResult("Value must be a number");
    }

    if (value < finalCfg.value) {
      return errorResult(finalCfg.message.replace('{value}', finalCfg.value+''));
    }

    return successResult();
  });
};

export default minValue;