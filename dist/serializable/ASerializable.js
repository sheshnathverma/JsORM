"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ASerializable {
    constructor() {
        this.Loaded = false;
        this.Json = {};
        this.Json = {};
        this.Map = new Map();
        this.Update({ DateTime: new Date(), HasChanged: false });
    }
    get IsLoaded() {
        return this.Loaded;
    }
    get LastUpdated() {
        return this.Get("LastUpdated");
    }
    get HasChanged() {
        return !!this.Get("HasChanged");
    }
    Get(Name, format) {
        format = format || function (v) { return v; };
        return format(this.Map.get(Name));
    }
    Set(Name, value, parser) {
        parser = parser || function (v) { return v; };
        if (!Object.is(this.Map.get(Name), parser(value))) {
            this.Map.set(Name, parser(value));
            this.Update({});
            return true;
        }
        return false;
    }
    Update({ DateTime, HasChanged }) {
        this.Map.set("LastUpdated", DateTime || new Date());
        this.Map.set("HasChanged", HasChanged === true);
    }
    toJson(depth) {
        let self = {};
        self["LastUpdated"] = this.Get("LastUpdated");
        return self;
    }
    fromJson(json, depth) {
        this.Json = json || {};
        this.Map = new Map();
        this.Loaded = true;
        this.Update({});
    }
    cast(target, depth) {
        depth = depth || 0;
        target.fromJson(this.toJson(depth));
        return target;
    }
}
exports.ASerializable = ASerializable;
