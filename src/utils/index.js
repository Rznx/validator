export const isArray = (value) => {
  return {}.toString.call(value) === '[object Array]';
};

export const isObject = (value) => {
  return {}.toString.call(value) === '[object Object]';
};

export const isEmpty = (obj) => {
  if (obj === null || obj === undefined || obj === '')
    return true;

  if (isArray(obj) && 0 === obj.length)
    return true;

  if (isObject(obj)) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};