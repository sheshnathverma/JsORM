"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASerializable_1 = require("../serializable/ASerializable");
var ABaseEntityField;
(function (ABaseEntityField) {
    ABaseEntityField[ABaseEntityField["GUID"] = 0] = "GUID";
})(ABaseEntityField = exports.ABaseEntityField || (exports.ABaseEntityField = {}));
class ABaseEntity extends ASerializable_1.ASerializable {
    get GUID() {
        return this.Get("GUID") || null;
    }
    get IsNew() {
        return !!this.Get("GUID");
    }
    constructor({ GUID }) {
        super();
        this.Set("GUID", GUID);
        this.Update({ DateTime: new Date(), HasChanged: !GUID });
    }
    toJson(depth) {
        depth = depth || 0;
        let self = super.toJson(depth);
        Object
            .keys(ABaseEntityField)
            .filter((k) => !isNaN(Number(k)))
            .map((k) => [ABaseEntityField[k], this.Json[ABaseEntityField[k]]])
            .forEach((v) => self[v[0]] = v[1]);
        return self;
    }
    fromJson(json, depth) {
        depth = depth || 0;
        super.fromJson(json, depth);
        Object
            .keys(ABaseEntityField)
            .filter((k) => !isNaN(Number(k)))
            .map((k) => [ABaseEntityField[k], this.Json[ABaseEntityField[k]]])
            .forEach((v) => this.Set(v[0], v[1]));
    }
}
exports.ABaseEntity = ABaseEntity;
