export declare class Utils {
    static isBoolean(value: any): boolean;
    static isObject(value: any): boolean;
    static isBlankObject(value: any): boolean;
    static isString(value: any): boolean;
    static isInteger(value: any): boolean;
    static isNumber(value: any): boolean;
    static isDate(value: any): boolean;
    static isArray(value: any): boolean;
    static isEnum(value: any, enum_object: any): boolean;
    static toInteger(value: any): Number | null;
    static toDate(value: any): Date | null;
    static toEnumValue(value: any, enum_object: any): number;
    static toEnumString(value: any, enum_object: any): string;
}
