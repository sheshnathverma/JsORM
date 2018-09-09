"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASerializable_1 = require("../serializable/ASerializable");
/**
 * Fields of IBaseEntity as enum object */
var ABaseEntityField;
(function (ABaseEntityField) {
    ABaseEntityField[ABaseEntityField["GUID"] = 0] = "GUID";
})(ABaseEntityField = exports.ABaseEntityField || (exports.ABaseEntityField = {}));
/**
 * ABaseEntity is extended interface of IBaseEntity */
class ABaseEntity extends ASerializable_1.ASerializable {
    /** it is key of any IBaseEntity type of class */
    get GUID() {
        return this.Get("GUID") || null;
    }
    /** it is true if object is newly created */
    get IsNew() {
        return !!this.Get("GUID");
    }
    /**
     * get instance of any ABaseEntity class and it will assign GUID propetiy if object has key GUID
     * @param param0 optional object {GUID}
     */
    constructor({ GUID }) {
        super();
        this.Set("GUID", GUID);
        this.Update({ DateTime: new Date(), HasChanged: !GUID });
    }
    /**
     * Get json object from instance of current class
     * @param depth what should to depth of serialization
     * @returns json data with minimum level zero
     */
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
    /**
     * load json object into instance of current class
     * @param depth What should to depth of deserialization
     * @param json json data
     */
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
