export const successResult = () => ({
  valid: true,
  errorMessage: ''
});

export const errorResult = (message) => {
  return Object.assign({}, successResult(), {
    valid: false,
    errorMessage: message
  });
};

export const validationFactory = (uniqueName, callback) => {
  if (uniqueName) {
    Object.defineProperty(callback, 'validationName', {
      value: uniqueName,
      writable: false,
      enumerable: true,
      configurable: false
    });
  }

  return callback;
}