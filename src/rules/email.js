import { validationFactory, successResult, errorResult } from 'core';

const email = (cfg) => {
  const defaultCfg = {
    message: 'Invalid e-mail'
  };

  const regex = /^[a-z0-9\u007F-\uffff!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

  const finalCfg = Object.assign({}, defaultCfg, cfg);

  return validationFactory('email', (value) => {
    if (value !== null && value !== undefined && value !== '') {
      if (!regex.exec(value)) {
        return errorResult(finalCfg.message);
      }
    }

    return successResult();
  });
};

export default email;