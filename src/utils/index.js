export const omit = (obj, arrWithRemoveKeys) => {
  if (
    // if obj is not 'object'
    (Array.isArray(obj) || typeof obj !== 'object') ||
    // if arrWithRemoveKeys is not Array
    !Array.isArray(arrWithRemoveKeys)
    ) {
    return;
  }

  // return obj without keys (properties) of arrWithRemoveKeys
  return Object.keys(obj).reduce((acc, key) => {
    if (arrWithRemoveKeys.indexOf(key) === -1) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}

export const isEmpty = (objOrArr) => {
  if (Array.isArray(objOrArr)) {
    // 0 is false, 1 and more is true
    return !objOrArr.length;
  }

  if (typeof objOrArr === 'object') {
    // 0 is false, 1 and more is true
    return !Object.keys(objOrArr).length;
  }
};

export const jc = (...arg) => {
  return arg.join(' ');
};
