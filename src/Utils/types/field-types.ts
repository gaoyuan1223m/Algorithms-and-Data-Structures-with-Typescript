
const TO_STRING = Object.prototype.toString;

const getType = (value: any): string => TO_STRING.call(value);

export enum TYPES {
    BOOLEAN = '[object Boolean]',
    NUMBER = '[object Number]',
    STRING = '[object String]',
    UNDEFINED = '[object Undefined]',
    NULL = '[object Null]',
    ARRAY = '[object Array]',
    OBJECT = '[object Object]',
    FUNCTION = '[object Function]',
    MATH = '[object Math]',
    REGEXP = '[object RegExp]',
    JSON = '[object JSON]',
    DATE = '[object Date]',
    Error = '[object Error]'
}

export const isNullOrUndefined = (value: any) => {
    const type = getType(value);
    return type === TYPES.NULL || type === TYPES.UNDEFINED;
}

export const isNanOrInfinity = (value: any) => {
    const type = getType(value);
    if (type === TYPES.NUMBER) {
        return value === NaN || value === Infinity
    }
    return false;
}

export const isEmptyString = (value: any) => getType(value) === TYPES.STRING ? value === '' : false;

export const isPlainObject = (value: any) => getType(value) === TYPES.OBJECT;

export const isArray = (value: any) => getType(value) === TYPES.ARRAY;
