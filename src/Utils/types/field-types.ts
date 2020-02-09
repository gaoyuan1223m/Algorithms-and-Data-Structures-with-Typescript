
const TO_STRING = Object.prototype.toString;

export const getElemType = (value: any): string => TO_STRING.call(value).match(/^\[object (.*)\]$/)[1].toLowerCase()

export enum TYPES {
    BOOLEAN = 'boolean',
    NUMBER = 'number',
    STRING = 'string',
    UNDEFINED = 'undefined',
    NULL = 'null',
    ARRAY = 'array',
    OBJECT = 'object',
    FUNCTION = 'function',
    MATH = 'math',
    REGEXP = 'regexp',
    JSON = 'json',
    DATE = 'date',
    Error = 'error'
}
