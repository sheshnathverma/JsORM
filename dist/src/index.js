System.register(["./ASerializable", "./ABaseEntity", "./Utils", "./ISchema"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (ASerializable_1_1) {
                exportStar_1(ASerializable_1_1);
            },
            function (ABaseEntity_1_1) {
                exportStar_1(ABaseEntity_1_1);
            },
            function (Utils_1_1) {
                exportStar_1(Utils_1_1);
            },
            function (ISchema_1_1) {
                exportStar_1(ISchema_1_1);
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=index.js.map