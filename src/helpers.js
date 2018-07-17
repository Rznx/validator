import required from 'rules/required';

export const setRequired = (value, field, rules) => {
  toggleValidationRule(value, field, required, rules);
};

export const toggleValidationRule = (value, field, validationFn, rules) => {
  const validationProduct = validationFn();
  const validationFnName = validationProduct['validationName'];
  let validationArrIndex = -1;

  Object.keys(rules).forEach((key) => {
    if (key !== field) {
      return;
    }

    validationArrIndex = rules[key].findIndex((item) => {
      return (item.hasOwnProperty('validationName') && item['validationName'] === validationFnName); 
    });

    if (value && validationArrIndex === -1) {
      rules[key].unshift(validationFn());
    } else if(!value && validationArrIndex !== -1) {
      rules[key].splice(validationArrIndex, 1);
    }
  });
};