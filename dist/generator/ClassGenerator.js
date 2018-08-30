"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FieldType_1 = require("../schema/FieldType");
const Utils_1 = require("../utils/Utils");
class Generator {
    static Generate(schemas) {
        return (schemas || []).map((schema) => {
            return {
                dependancy: Generator.getImportDependancy(),
                interface: Generator.getInterface(schema),
                enum: Generator.getEnum(schema),
                base: Generator.getBaseClass(schema),
                class: Generator.getClass(schema)
            };
        });
    }
    static getImportDependancy() {
        return `
/*
import { ISerializable } from './ISerializable';
import { ASerializable } from './ASerializable';
import { IBaseEntity } from './IBaseEntity';
import { ABaseEntity } from './ABaseEntity';
import { Utils } from './Utils'; */
`;
    }
    static getInterface(schema) {
        return `
/**
  * Auto generated interface for {0} class
  * It enum contains all fields exclude foreign key list object
  */
interface I{0} extends {1}, {2} {
{3}
}`
            .replace(/\{0\}/g, schema.name)
            .replace(/\{1\}/g, schema.extends || "ABaseEntity")
            .replace(/\{2\}/g, (schema.implements || []).join(", ") || "IBaseEntity")
            .replace(/\{3\}/g, schema
            .fields
            .filter((field) => {
            if (!field.readonly && field.is_fk === true && Utils_1.Utils.toEnumValue(field.type, FieldType_1.FieldType) === FieldType_1.FieldType.array)
                return false;
            else
                return true;
        })
            .map(function (field) {
            if (field.is_fk)
                return "    " + field.name + ": " + (field.type) + " | any;";
            if (Utils_1.Utils.toEnumValue(field.type, FieldType_1.FieldType) === FieldType_1.FieldType.date)
                return "    " + field.name + ": Date | any;";
            else
                return "    " + field.name + ": " + (field.object_type || field.type) + " | any;";
        })
            .join("\n"));
    }
    static getClass(schema) {
        return `
/**
import { Base{0} } from "./Base{0}";*/

/**
  * Auto generated {0} class
  * It has to extends Base{0} class or implements ISerializable or both in direct or indirect
  */
export class {0} extends Base{0} {

    /**
      * Auto generated constructor for {0} class
      * @param by default it take GUID as key property 
      */
    constructor({ GUID }: any) {
        super({ GUID });
    }

    // You can add custom code in this class

}`
            .replace(/\{0\}/g, schema.name);
    }
    static getEnum(schema) {
        return `
/**
  * Auto generated field enum for {0} class
  * It enum contains all fields exclude foreign key list object
  */
enum {0}Field {
{1}
}`
            .replace(/\{0\}/g, schema.name)
            .replace(/\{1\}/g, schema
            .fields
            .filter((field) => {
            if (field.is_fk === true && Utils_1.Utils.toEnumValue(field.type, FieldType_1.FieldType) === FieldType_1.FieldType.array)
                return false;
            else
                return true;
        })
            .map(function (field) { return "    " + field.name; })
            .join(",\n"));
    }
    static getBaseClass(schema) {
        return `
/**
import { I{0} } from "./I{0}";*/

/**
  * Auto generated Base{0} class
  * It has to extends ASerializable class or implements ISerializable or both in direct or indirect
  */
export class Base{0} extends {1} implements I{0}, {2} {
    {3}
    
    /**
      * Auto generated constructor for {0} class
      * @param by default it take GUID as key property 
      */
    constructor({ GUID }: any) {
        super({ GUID });
    }
    
    {4}
}`
            .replace(/\{0\}/g, schema.name)
            .replace(/\{1\}/g, (schema.extends || "ABaseEntity"))
            .replace(/\{2\}/g, (schema.implements || []).join(", ") || "IBaseEntity")
            .replace(/\{3\}/g, Generator.getProperties(schema))
            .replace(/\{4\}/g, [Generator.save(schema), Generator.delete(schema), Generator.toJson(schema), Generator.fromJson(schema)].join("\n\n"));
    }
    static getProperties(schema) {
        return schema.fields.map((field) => { return Generator.getProperty(field, schema); }).join("\n\n");
    }
    static getProperty(field, schema) {
        let get = (field, schema) => {
            switch (Utils_1.Utils.toEnumValue(field.type, FieldType_1.FieldType)) {
                case FieldType_1.FieldType.number:
                case FieldType_1.FieldType.string:
                case FieldType_1.FieldType.boolean: {
                    return `
    get {0}(): {1} { return this.Get("{0}"); }`
                        .replace(/\{0\}/g, (field.name))
                        .replace(/\{1\}/g, Utils_1.Utils.toEnumString(field.type, FieldType_1.FieldType));
                }
                case FieldType_1.FieldType.date: {
                    return `
    get {0}(): Date | any { return Utils.toDate(this.Get("{0}")); }`
                        .replace(/\{0\}/g, (field.name));
                }
                case FieldType_1.FieldType.enum: {
                    return `
    get {0}(): {1} { return Utils.toEnumValue(this.Get("{0}"), {1}); }`
                        .replace(/\{0\}/g, field.name)
                        .replace(/\{1\}/g, field.object_type);
                }
                case FieldType_1.FieldType.integer: {
                    return `
    get {0}(): Number { return Utils.toInteger(this.Get("{0}")); }`
                        .replace(/\{0\}/g, (field.name));
                }
                case FieldType_1.FieldType.object: {
                    if (field.is_fk) {
                        return `
    private _{1}: {2}  | any;
    get {0}(): any { return this.Get("{0}"); }    
    get {1}(): {2} | any {
        if (this.{0}!==null && this.{0}!==undefined) { 
            return this._{1}; 
        }
        else {
            return null;
        }
    }`
                            .replace(/\{0\}/g, field.name)
                            .replace(/\{1\}/g, field.object_name)
                            .replace(/\{2\}/g, field.object_type);
                    }
                    else {
                        return `
    get {0}(): {1} | any { return this.Get("{0}"); }`
                            .replace(/\{0\}/g, field.name)
                            .replace(/\{2\}/g, field.object_type);
                    }
                }
                case FieldType_1.FieldType.array: {
                    if (field.is_fk) {
                        return `
    private _{0}: {1}[] | any;
    get {0}(): {1}[] | any {
        if (!this._{0}) {
            this._{0} = Array<{1}>();
        }
        return this._{0};
    }`
                            .replace(/\{0\}/g, (field.name))
                            .replace(/\{1\}/g, field.object_type);
                    }
                    else {
                        return `
    get {0}(): {1} | any[] { return this.Get("{0}"); }`
                            .replace(/\{0\}/g, field.name)
                            .replace(/\{2\}/g, field.object_type);
                    }
                }
            }
            return "";
        };
        let set = (field, schema) => {
            switch (Utils_1.Utils.toEnumValue(field.type, FieldType_1.FieldType)) {
                case FieldType_1.FieldType.number: {
                    return `
    set {0}(value: number) {  
        if(Utils.isNumber(value)) {
            this.Set("{0}", value); 
        } 
        else {
            throw "invalid input for {1}.{0}"; 
        }
    }`
                        .replace(/\{0\}/g, field.name)
                        .replace(/\{1\}/g, schema.name);
                }
                case FieldType_1.FieldType.string: {
                    return `
    set {0}(value: string) {  
        if(Utils.isString(value)) {
            this.Set("{0}", value); 
        } 
        else {
            throw "invalid input for {1}.{0}"; 
        }
    }`
                        .replace(/\{0\}/g, field.name)
                        .replace(/\{1\}/g, schema.name);
                }
                case FieldType_1.FieldType.boolean: {
                    return `
    set {0}(value: boolean) {  
        if(Utils.isBoolean(value)) {
            this.Set("{0}", value); 
        } 
        else {
            throw "invalid input for {1}.{0}"; 
        }
    }`
                        .replace(/\{0\}/g, field.name)
                        .replace(/\{1\}/g, schema.name);
                }
                case FieldType_1.FieldType.date: {
                    return `
    set {0}(value: Date | any) {  
        if(Utils.isDate(value)) {
            this.Set("{0}", value); 
        } 
        else {
            throw "invalid input for {1}.{0}"; 
        }
    }`
                        .replace(/\{0\}/g, field.name)
                        .replace(/\{1\}/g, schema.name);
                }
                case FieldType_1.FieldType.enum: {
                    return `
    set {0}(value: {2}) {  
        if(Utils.isEnum(value, {2})) {
            this.Set("{0}", Utils.toEnumValue(value, {2})); 
        } 
        else {
            throw "invalid input for {1}.{0}"; 
        }
    }`
                        .replace(/\{0\}/g, field.name)
                        .replace(/\{1\}/g, schema.name)
                        .replace(/\{1\}/g, field.object_type);
                }
                case FieldType_1.FieldType.integer: {
                    return `
    set {0}(value: number) {  
        if(Utils.isNumber(value)) {
            this.Set("{0}", Utils.toInteger(value)); 
        } 
        else {
            throw "invalid input for {1}.{0}"; 
        }
    }`
                        .replace(/\{0\}/g, field.name)
                        .replace(/\{1\}/g, schema.name);
                }
                case FieldType_1.FieldType.object: {
                    if (field.is_fk) {
                        return `
    set {0}(value: any) {
        if (this.Set("{0}", value)) {
            this._{1} = new {2}({ GUID: value });
        }
    }`
                            .replace(/\{0\}/g, field.name)
                            .replace(/\{1\}/g, field.object_name)
                            .replace(/\{2\}/g, field.object_type);
                    }
                    else {
                        return `
    set {0}(value: any) { this.Set("{0}", value)); }`
                            .replace(/\{0\}/g, field.name);
                    }
                }
                case FieldType_1.FieldType.array: {
                    if (field.is_fk) {
                        return ``;
                    }
                    else {
                        return `
    set {0}(value: any[]) { 
        if(Utils.isArray(value)) {
            this.Set("{0}", value)); 
        }
        else {
            throw "invalid input for {1}.{0}"; 
        }`
                            .replace(/\{0\}/g, field.name)
                            .replace(/\{2\}/g, schema.name);
                    }
                }
            }
            return "";
        };
        return [get(field, schema), field.readonly ? '' : set(field, schema)].join("");
    }
    static toJson(schema) {
        return `
    toJson(depth?: number): any {
        depth = depth || 0;
        let self = super.toJson(depth);

        Object
            .keys({0}Field)
            .filter((k: any) => !isNaN(Number(k)))
            .map((k: any) => [{0}Field[k], this.Json[{0}Field[k]]])
            .forEach((v) => self[v[0]] = v[1]);

{1}
{2}
        return self;
    }`
            .replace(/\{0\}/g, schema.name)
            .replace(/\{1\}/g, schema
            .fields
            .filter(function (f) { return f.is_fk && Utils_1.Utils.toEnumValue(f.type, FieldType_1.FieldType) !== FieldType_1.FieldType.array; })
            .map(function (f) {
            return `
        if (depth > 0 && this.{0}) {
            self.{0} = this.{0}.toJson((depth || 0) - 1);
        }`
                .replace(/\{0\}/g, f.object_name);
        }).join("\n"))
            .replace(/\{2\}/g, schema
            .fields
            .filter(function (field) { return field.is_fk && Utils_1.Utils.toEnumValue(field.type, FieldType_1.FieldType) === FieldType_1.FieldType.array; })
            .map(function (field) {
            return `
        if (depth > 0 && this.{0}.length) {
            self.{0} = this.{0}.map((item: ISerializable)=> {
                return item.toJson((depth || 0) - 1);
            });
        }`
                .replace(/\{0\}/g, field.name);
        }).join("\n"));
    }
    static fromJson(schema) {
        return `
    fromJson(json: any, depth?: number): void {
        depth = depth || 0;
        super.fromJson(json, depth);

        Object
            .keys({0}Field)
            .filter((k: any) => !isNaN(Number(k)))
            .map((k: any) => [{0}Field[k], this.Json[{0}Field[k]]])
            .forEach((v) => this.Map.set(v[0], v[1]));

{1}
{2}
    }`
            .replace(/\{0\}/g, schema.name)
            .replace(/\{1\}/g, schema
            .fields
            .filter(function (field) { return field.is_fk && Utils_1.Utils.toEnumValue(field.type, FieldType_1.FieldType) !== FieldType_1.FieldType.array; })
            .map(function (field) {
            return `
        if (depth && this.Json.{0}) {
            this._{0} = new {1}({});
            this.{0}.fromJson(this.Json.{0}, (depth || 0) - 1);
        }`
                .replace(/\{0\}/g, field.object_name)
                .replace(/\{1\}/g, field.object_type);
        })
            .join("\n"))
            .replace(/\{2\}/g, schema
            .fields
            .filter(function (field) { return field.is_fk && Utils_1.Utils.toEnumValue(field.type, FieldType_1.FieldType) === FieldType_1.FieldType.array; })
            .map(function (field) {
            return `
        if (depth && this.Json.{0} && this.Json.{0}.length) {
            this._{0} = this.Json.{0}.map((item: any) => {
                return new {1}({}).fromJson(item, (depth || 0) - 1);
            });
        }`
                .replace(/\{0\}/g, field.name)
                .replace(/\{1\}/g, field.object_type);
        })
            .join("\n"));
    }
    static save(schema) {
        return `
    async Save(): Promise<{0}> {
        throw "not implemented";
    }`
            .replace(/\{0\}/, schema.name);
    }
    static delete(schema) {
        return `
    async Delete(): Promise<{0}> {
        throw "not implemented";
    }`
            .replace(/\{0\}/, schema.name);
    }
}
exports.Generator = Generator;
