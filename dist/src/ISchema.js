System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FieldType;
    return {
        setters: [],
        execute: function () {
            (function (FieldType) {
                FieldType[FieldType["array"] = 0] = "array";
                FieldType[FieldType["boolean"] = 1] = "boolean";
                FieldType[FieldType["date"] = 2] = "date";
                FieldType[FieldType["integer"] = 3] = "integer";
                FieldType[FieldType["enum"] = 4] = "enum";
                FieldType[FieldType["number"] = 5] = "number";
                FieldType[FieldType["object"] = 6] = "object";
                FieldType[FieldType["string"] = 7] = "string";
            })(FieldType || (FieldType = {}));
            exports_1("FieldType", FieldType);
            ;
        }
    };
});
//# sourceMappingURL=ISchema.js.map