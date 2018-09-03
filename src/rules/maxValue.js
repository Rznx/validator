import { validationFactory, successResult, errorResult } from 'core';

const maxValue = (cfg) => {
  const defaultCfg = {
    value: 1,
    message: 'Maximum value accepted is {value}'
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
      return errorResult("Value must be a number");
    }

    if (value > finalCfg.value) {
      return errorResult(finalCfg.message.replace('{value}', finalCfg.value+''));
    }

    return successResult();
  });
};

export default maxValue;