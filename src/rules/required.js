import { validationFactory, successResult, errorResult } from 'core';
import { isArray, isEmpty } from 'utils';

const required = (cfg) => {
  const defaultCfg = {
    message: 'O campo é obrigatório',
    searchId: null,
    richText: null,
    onlyIf: (value, data) => true,
  };

  const finalCfg = Object.assign({}, defaultCfg, cfg);

  return validationFactory('required', (value, data) => {
    let finalValue = (finalCfg.searchId ? data[finalCfg.searchId] : value);

    if (!finalCfg.onlyIf(finalValue, data)) {
      return successResult();
    }

    if (isArray(finalValue) && isEmpty(finalValue)) {
      return errorResult(finalCfg.message);
    }
    if (finalCfg.richText) {
      const emptyRichText1 = '<p><br></p>';
      const emptyRichText2 = '<p></p>';

      if (finalValue === emptyRichText1 || finalValue === emptyRichText2) {
        finalValue = '';
      }
    }
    
    const checkValue = (value) =>
      value !== null && value !== undefined && value !== '';

    return (
      checkValue(finalValue)
        ? successResult()
        : errorResult(finalCfg.message));
  });
};

export default required;