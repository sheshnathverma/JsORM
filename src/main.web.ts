import { Generator } from './index';

export function generate(data: any) {
    if (!Array.isArray(data)) {
        data = [data];
    }

    let enums: any[] = [];
    (data || []).forEach((item: any) => {
        enums = enums.concat(Generator.getEnumDependancy(item));
    });

    const output = [
        enums
            .filter((e, i, self) => {
                return e && e.trim() && self.indexOf(e) === i;
            })
            .map((e) => {
                return '\nexport enum ' + e + ` {

}`;
            }).join('\n'),

        Generator
            .Generate(data)
            .map((item) => {
                return [item.dependancy, item.interface, item.enum, item.base, item.class].join("\n\n")
            }).join("\n\n")
    ].join("\n");

    const Utils = `
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

    static toInteger(value: any): number | null {
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
`;
    const ISerializable = `
export interface ISerializable {
    /**
     * readonly Date type property which tell about object has latest updated time
     */
    readonly LastUpdated: Date;
    /**
     * it should return json object from instance of current ISerializable class
     * @param depth what should to depth of serialization 
     * @returns json data with minimum level zero 
     */
    toJson(depth?: number): any;

    /**
     * it should load json object into instance of current ISerializable class
     * @param depth What should to depth of deserialization 
     * @param json json data
     */
    fromJson(json: any, depth?: number): void;

    /**
     * cast method should convert current object into @param target ISerializable object
     * @param target any instance of class ISerializable class
     * @param depth what should to depth of deserialization
     */
    cast<T extends ISerializable>(target: T, depth?: number): T;
}`;
    const ASerializable = `
/**
 * Abstract base class which has basic implements of ISerializable interface */
export abstract class ASerializable implements ISerializable {
    private _loaded: boolean = false;
    private readonly _promises: Promise<any>[];

    /**
     * readonly boolean property which will tell about object has loaded or not
     */
    get IsLoaded(): boolean {
        return this._loaded;
    }

    /**
     * readonly Date type property which tell about object has latest updated time
     */
    get LastUpdated(): Date {
        return this.Get("LastUpdated");
    }

    /**
     * readonly boolean property which will tell about object has changed
     */
    get HasChanged(): boolean {
        return !!this.Get("HasChanged");
    }

    /**
     * It is Map object which is only contain actual properties related to current class
     */
    protected Map: Map<string, any>;

    /**
     * It is initial json object we keep this object in memory.
     * this object help in type casting and we can set all available properties of target type object without losing data
     */
    protected Json: any = {};

    /**
     * It is end constructor of ISerializable type object 
     */
    constructor() {
        this.Json = {};
        this.Map = new Map();
        this._promises = [];
        this.Update({ DateTime: new Date(), HasChanged: false });
    }

    /**
     * get property value and can pass formater to get data in desire format
     * @param Name name of property
     * @param format formater function to get value in desire format
     */
    protected Get(Name: string, format?: Function) {
        format = format || function (v: any) { return v };
        return format(this.Map.get(Name));
    }

    /**
     * set property value and can format value before commit in dataset
     * @param Name name of property
     * @param value value of property
     * @param parser parser function apply before commit change value in dataset
     */
    protected Set(Name: string, value: any, parser?: Function): boolean {
        parser = parser || function (v: any) { return v };
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
    protected Update({ DateTime, HasChanged }: any): void {
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
    NewPromise<T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T> {
        const promise = new Promise(executor);
        this._promises.push(promise);

        const deletePromise = (pr: any) => {
            const index = this._promises.indexOf(pr);
            this._promises.splice(index, 1);
        };
        return promise
            .then((result: any) => {
                deletePromise(promise);
                return result;
            })
            .catch((err: any) => {
                deletePromise(promise);
                throw err;
            });
    }

    /**
     * Get json object from instance of current class
     * @param depth what should to depth of serialization 
     * @returns json data with minimum level zero 
     */
    toJson(depth?: number): any {
        let self: any = {};
        self["LastUpdated"] = this.Get("LastUpdated");
        return self;
    }

    /**
     * load json object into instance of current class
     * @param depth What should to depth of deserialization 
     * @param json json data
     */
    fromJson(json: any, depth?: number): void {
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
    cast<T extends ISerializable>(target: T, depth?: number): T {
        depth = depth || 0;
        target.fromJson(this.toJson(depth));
        return target;
    }
}`;
    const IBaseEntity = `
/**
 * this is extended interface of ISerializable */
export interface IBaseEntity extends ISerializable {
    /** it is key of any IBaseEntity type of class */
    readonly GUID: string;

    /** it is true if object is newly created */
    readonly IsNew: boolean;

    /** implement asyn save method */
    Save(): Promise<IBaseEntity>;

    /** implement asyn delete method */
    Delete(): Promise<IBaseEntity>;    
}`;
    const ABaseEntity = `
/**
 * Fields of IBaseEntity as enum object */
export enum ABaseEntityField {
    GUID
}

/**
 * ABaseEntity is extended interface of IBaseEntity */
export abstract class ABaseEntity extends ASerializable implements IBaseEntity {

    /** it is key of any IBaseEntity type of class */
    get GUID(): string {
        return this.Get("GUID") || null;
    }

    /** it is true if object is newly created */
    get IsNew(): boolean {
        return !!this.Get("GUID");
    }

    /**
     * get instance of any ABaseEntity class and it will assign GUID propetiy if object has key GUID
     * @param param0 optional object {GUID}
     */
    constructor({ GUID }: any) {
        super();
        this.Set("GUID", GUID);
        this.Update({ DateTime: new Date(), HasChanged: !GUID });
    }

    /**
     * Get json object from instance of current class
     * @param depth what should to depth of serialization 
     * @returns json data with minimum level zero 
     */
    toJson(depth?: number): any {
        depth = depth || 0;
        let self = super.toJson(depth);
        Object
            .keys(ABaseEntityField)
            .filter((k: any) => !isNaN(Number(k)))
            .map((k: any) => [ABaseEntityField[k], this.Json[ABaseEntityField[k]]])
            .forEach((v) => self[v[0]] = v[1]);
        return self;
    }

    /**
     * load json object into instance of current class
     * @param depth What should to depth of deserialization 
     * @param json json data
     */
    fromJson(json: any, depth?: number): void {
        depth = depth || 0;
        super.fromJson(json, depth);
        Object
            .keys(ABaseEntityField)
            .filter((k: any) => !isNaN(Number(k)))
            .map((k: any) => [ABaseEntityField[k], this.Json[ABaseEntityField[k]]])
            .forEach((v) => this.Set(v[0], v[1]));
    }

    /** implement asyn save method */
    abstract async Save(): Promise<ABaseEntity>;
    /** implement asyn delete method */
    abstract Delete(): Promise<ABaseEntity>;
}`;
    //return Generator.getImportDependancy() + '\n' + [Utils, ISerializable, ASerializable, IBaseEntity, ABaseEntity].join('\n') + output.split("\n").filter((e) => !e.startsWith("//import {")).join("\n");
    return [Utils, ISerializable, ASerializable, IBaseEntity, ABaseEntity].join('\n') + output.split("\n").filter((e) => !e.startsWith("//import {")).join("\n");
}