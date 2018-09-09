"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Abstract base class which has basic implements of ISerializable interface */
class ASerializable {
    /**
     * It is end constructor of ISerializable type object
     */
    constructor() {
        this._loaded = false;
        /**
         * It is initial json object we keep this object in memory.
         * this object help in type casting and we can set all available properties of target type object without losing data
         */
        this.Json = {};
        this.Json = {};
        this.Map = new Map();
        this._promises = [];
        this.Update({ DateTime: new Date(), HasChanged: false });
    }
    /**
     * readonly boolean property which will tell about object has loaded or not
     */
    get IsLoaded() {
        return this._loaded;
    }
    /**
     * readonly Date type property which tell about object has latest updated time
     */
    get LastUpdated() {
        return this.Get("LastUpdated");
    }
    /**
     * readonly boolean property which will tell about object has changed
     */
    get HasChanged() {
        return !!this.Get("HasChanged");
    }
    /**
     * get property value and can pass formater to get data in desire format
     * @param Name name of property
     * @param format formater function to get value in desire format
     */
    Get(Name, format) {
        format = format || function (v) { return v; };
        return format(this.Map.get(Name));
    }
    /**
     * set property value and can format value before commit in dataset
     * @param Name name of property
     * @param value value of property
     * @param parser parser function apply before commit change value in dataset
     */
    Set(Name, value, parser) {
        parser = parser || function (v) { return v; };
        if (!Object.is(this.Map.get(Name), parser(value))) {
            this.Map.set(Name, parser(value));
            this.Update({});
            return true;
        }
        return false;
    }
    /**
     * it will explicitly save last updated and any changes has been done
     * @param param0 object which can have DateTime and HasChanged properties
     */
    Update({ DateTime, HasChanged }) {
        this.Map.set("LastUpdated", DateTime || new Date());
        this.Map.set("HasChanged", HasChanged === true);
    }
    /**
     * Check if any promise waiting to finish
     * @returns true if any promise waiting related to this */
    IsPromiseWaiting() {
        return this._promises.length > 0;
    }
    /**
     * Creates a new Promise.
     * @param executor A callback used to initialize the promise. This callback is passed two arguments:
     * a resolve callback used resolve the promise with a value or the result of another promise,
     * and a reject callback used to reject the promise with a provided reason or error.
     */
    NewPromise(executor) {
        const promise = new Promise(executor);
        this._promises.push(promise);
        const deletePromise = (pr) => {
            const index = this._promises.indexOf(pr);
            this._promises.splice(index, 1);
        };
        return promise
            .then((result) => {
            deletePromise(promise);
            return result;
        })
            .catch((err) => {
            deletePromise(promise);
            throw err;
        });
    }
    /**
     * Get json object from instance of current class
     * @param depth what should to depth of serialization
     * @returns json data with minimum level zero
     */
    toJson(depth) {
        let self = {};
        self["LastUpdated"] = this.Get("LastUpdated");
        return self;
    }
    /**
     * load json object into instance of current class
     * @param depth What should to depth of deserialization
     * @param json json data
     */
    fromJson(json, depth) {
        this.Json = json || {};
        this.Map = new Map();
        this._loaded = true;
        this.Update({});
    }
    /**
     * cast current object into @param target ISerializable object
     * @param target any instance of class ISerializable class
     * @param depth what should to depth of deserialization
     */
    cast(target, depth) {
        depth = depth || 0;
        target.fromJson(this.toJson(depth));
        return target;
    }
}
exports.ASerializable = ASerializable;
