
export class Utils {
    static isBoolean(value: any): boolean {
        return typeof value === 'boolean';
    }

    static isObject(value: any): boolean {
        return this !== null && typeof this === 'object';
    }

    static isBlankObject(value: any): boolean {
        return value !== null && typeof value === 'object' && !Object.keys(value || {}).length;
    }

    static isString(value: any): boolean {
        return typeof value === 'string';
    }

    static isInteger(value: any): boolean {
        return typeof value === 'number' && !(("" + value).split('.')[1] || 0);
    }

    static isNumber(value: any): boolean {
        return typeof value === 'number';
    }

    static isDate(value: any): boolean {
        return toString.call(value) === '[object Date]';
    }

    static isArray(value: any): boolean {
        return Array.isArray(value) === true;
    }

    static isEnum(value: any, enum_object: any): boolean {
        enum_object = enum_object || {};
        return (Utils.isInteger(value) || Utils.isString(value)) && Object.keys.length > 0 && Object.is(value, enum_object[enum_object[value]]);
    }

    static toInteger(value: any): Number | null {
        return isNaN(value) ? null : Number(String(value).split('.')[0]);
    }

    static toDate(value: any): Date | null {
        if (Utils.isDate(value)) {
            return <Date>value;
        }
        else if (Utils.isNumber(value) && Number(value) >= 0) {
            return new Date(value);
        }
        else if (Utils.isString(value)) {
            let dt = Date.parse(value as string);
            return isNaN(dt) ? null : new Date(dt);
        }
        else {
            return null;
        }
    }

    static toEnumValue(value: any, enum_object: any): number {
        if (Utils.isEnum(value, enum_object)) {
            if (Utils.isString(value)) {
                value = Number(enum_object["" + value]);
            }
        }
        return value;
    }

    static toEnumString(value: any, enum_object: any): string {
        if (Utils.isEnum(value, enum_object)) {
            if (Utils.isNumber(value)) {
                value = enum_object[value]
            }
        }
        return value;
    }
}