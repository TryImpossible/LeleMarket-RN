const gettype = Object.prototype.toString;

export const isString = v => gettype.call(v) === '[object String]';

export const isNumber = v => gettype.call(v) === '[object Number]';

export const isBoolean = v => gettype.call(v) === '[object Boolean]';

export const isUndefined = v => gettype.call(v) === '[object Undefined]';

export const isNull = v => gettype.call(v) === '[object Null]';

export const isObject = v => gettype.call(v) === '[object Object]';

export const isArray = v => gettype.call(v) === '[object Array]';

export const isFunction = v => gettype.call(v) === '[object Function]';
