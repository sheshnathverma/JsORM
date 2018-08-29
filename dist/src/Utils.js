System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Utils;
    return {
        setters: [],
        execute: function () {
            Utils = class Utils {
                static isBoolean(value) {
                    return typeof value === 'boolean';
                }
                static isObject(value) {
                    return this !== null && typeof this === 'object';
                }
                static isBlankObject(value) {
                    return value !== null && typeof value === 'object' && !Object.keys(value || {}).length;
                }
                static isString(value) {
                    return typeof value === 'string';
                }
                static isInteger(value) {
                    return typeof value === 'number' && !(("" + value).split('.')[1] || 0);
                }
                static isNumber(value) {
                    return typeof value === 'number';
                }
                static isDate(value) {
                    return toString.call(value) === '[object Date]';
                }
                static isArray(value) {
                    return Array.isArray(value) === true;
                }
                static isEnum(value, enum_object) {
                    enum_object = enum_object || {};
                    return (Utils.isInteger(value) || Utils.isString(value)) && Object.keys.length > 0 && Object.is(value, enum_object[enum_object[value]]);
                }
                static toInteger(value) {
                    return isNaN(value) ? null : Number(String(value).split('.')[0]);
                }
                static toDate(value) {
                    if (Utils.isDate(value)) {
                        return value;
                    }
                    else if (Utils.isNumber(value) && Number(value) >= 0) {
                        return new Date(value);
                    }
                    else if (Utils.isString(value)) {
                        let dt = Date.parse(value);
                        return isNaN(dt) ? null : new Date(dt);
                    }
                    else {
                        return null;
                    }
                }
                static toEnumValue(value, enum_object) {
                    if (Utils.isEnum(value, enum_object)) {
                        if (Utils.isString(value)) {
                            value = Number(enum_object["" + value]);
                        }
                    }
                    return value;
                }
                static toEnumString(value, enum_object) {
                    if (Utils.isEnum(value, enum_object)) {
                        if (Utils.isNumber(value)) {
                            value = enum_object[value];
                        }
                    }
                    return value;
                }
            };
            exports_1("Utils", Utils);
        }
    };
});
//# sourceMappingURL=Utils.js.map