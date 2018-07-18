import { validationFactory, successResult, errorResult } from 'core';
import { isArray, isEmpty } from 'utils';

const required = (cfg) => {
  const defaultCfg = {
    message: 'Field is required',
    customEmpty: null,
    onlyIf: (value, data) => true,
  };

  const finalCfg = Object.assign({}, defaultCfg, cfg);

  return validationFactory('required', (value, data) => {

    if (!finalCfg.onlyIf(value, data)) {
      return successResult();
    }

    if (isArray(value) && isEmpty(value)) {
      return errorResult(finalCfg.message);
    }
    if (finalCfg.customEmpty) {
      const checkCustom = (isArray(finalCfg.customEmpty) ? finalCfg.customEmpty : [finalCfg.customEmpty]);

      if (checkCustom.indexOf(value) !== -1) {
        value = '';
      }
    }
    
    const checkValue = (value) =>
      value !== null && value !== undefined && value !== '';

    return (
      checkValue(value)
        ? successResult()
        : errorResult(finalCfg.message));
  });
};

export default required;