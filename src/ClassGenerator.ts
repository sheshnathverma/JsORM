import { ISchema, IField, FieldType } from "ISchema";
import { Utils } from "Utils";


export class Generator {
    static Generate(schemas: ISchema[]) {
        return (schemas || []).map((schema) => {
            return [Generator.getImportDependancy(), Generator.getClassFieldEnum(schema), Generator.getClass(schema)].join("\n\n\n");
        }).join("\n\n\n\n\n");
    }

    private static getImportDependancy() {
        return `
/*
import { ISerializable } from './ISerializable';
import { ASerializable } from './ASerializable';
import { IBaseEntity } from './IBaseEntity';
import { ABaseEntity } from './ABaseEntity';
import { Utils } from './Utils'; */
`
    }

    private static getClassFieldEnum(schema: ISchema) {
        return `
/**
  * Auto generated field enum for {0} class
  * It enum contains all fields exclude foreign key list object
  */
enum {0}Field {
{1}
}`
            .replace(/\{0\}/g, schema.name)
            .replace(/\{1\}/g,
                schema
                    .fields
                    .filter((field: IField) => {                        
                        if (field.is_fk === true && Utils.toEnumValue(field.type, FieldType) === FieldType.array) return false;
                        else return true;
                    })
                    .map(function (field: IField) { return "    " + field.name; })
                    .join(",\n"));
    }

    private static getClass(schema: ISchema) {
        return `
/**
  * Auto generated {0} class
  * It has to extends ASerializable class or implements ISerializable or both in direct or indirect
  */
export class {0} extends {1} implements {2} {
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
            .replace(/\{1\}/g, schema.extends || "ABaseEntity")
            .replace(/\{2\}/g, (schema.implements || []).join(", ") || "IBaseEntity")
            .replace(/\{3\}/g, Generator.getProperties(schema))
            .replace(/\{4\}/g, [Generator.save(schema), Generator.delete(schema), Generator.toJson(schema), Generator.fromJson(schema)].join("\n\n"));
    }

    private static getProperties(schema: ISchema) {
        return schema.fields.map((field) => { return Generator.getProperty(field, schema) }).join("\n\n");
    }

    private static getProperty(field: IField, schema: ISchema) {
        let get = (field: IField, schema: ISchema): string => {
            switch (Utils.toEnumValue(field.type, FieldType)) {
                case FieldType.number:
                case FieldType.string:
                case FieldType.boolean: {
                    return `
    get {0}(): {1} { return this.Get("{0}"); }`
                        .replace(/\{0\}/g, (field.name))
                        .replace(/\{1\}/g, Utils.toEnumString(field.type, FieldType))
                }
                case FieldType.date: {
                    return `
    get {0}(): Date | any { return Utils.toDate(this.Get("{0}")); }`
                        .replace(/\{0\}/g, (field.name))
                }
                case FieldType.enum: {
                    return `
    get {0}(): {1} { return Utils.toEnumValue(this.Get("{0}"), {1}); }`
                        .replace(/\{0\}/g, field.name)
                        .replace(/\{1\}/g, field.object_type)
                }
                case FieldType.integer: {
                    return `
    get {0}(): Number { return Utils.toInteger(this.Get("{0}")); }`
                        .replace(/\{0\}/g, (field.name))
                }
                case FieldType.object: {
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
                            .replace(/\{2\}/g, field.object_type)
                    }
                    else {
                        return `
    get {0}(): {1} | any { return this.Get("{0}"); }`
                            .replace(/\{0\}/g, field.name)
                            .replace(/\{2\}/g, field.object_type)
                    }
                }
                case FieldType.array: {
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
                            .replace(/\{1\}/g, field.object_type)
                    }
                    else {
                        return `
    get {0}(): {1} | any[] { return this.Get("{0}"); }`
                            .replace(/\{0\}/g, field.name)
                            .replace(/\{2\}/g, field.object_type)
                    }
                }
            }
            return ""
        }

        let set = (field: IField, schema: ISchema): string => {
            switch (Utils.toEnumValue(field.type, FieldType)) {
                case FieldType.number: {
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
                        .replace(/\{1\}/g, schema.name)
                }
                case FieldType.string: {
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
                        .replace(/\{1\}/g, schema.name)
                }
                case FieldType.boolean: {
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
                        .replace(/\{1\}/g, schema.name)
                }
                case FieldType.date: {
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
                        .replace(/\{1\}/g, schema.name)
                }
                case FieldType.enum: {
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
                        .replace(/\{1\}/g, field.object_type)
                }
                case FieldType.integer: {
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
                        .replace(/\{1\}/g, schema.name)
                }
                case FieldType.object: {
                    if (field.is_fk) {
                        return `
    set {0}(value: any) {
        if (this.Set("{0}", value)) {
            this._{1} = new {2}({ GUID: value });
        }
    }`
                            .replace(/\{0\}/g, field.name)
                            .replace(/\{1\}/g, field.object_name)
                            .replace(/\{2\}/g, field.object_type)
                    }
                    else {
                        return `
    set {0}(value: any) { this.Set("{0}", value)); }`
                            .replace(/\{0\}/g, field.name)
                    }
                }
                case FieldType.array: {
                    if (field.is_fk) {
                        return ``
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
                            .replace(/\{2\}/g, schema.name)
                    }
                }
            }
            return ""
        }

        return [get(field, schema), field.readonly ? '' : set(field, schema)].join("");
    }

    private static toJson(schema: ISchema) {
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
                .filter(function (f) { return f.is_fk && Utils.toEnumValue(f.type, FieldType) !== FieldType.array; })
                .map(function (f) {
                    return `
        if (depth > 0 && this.{0}) {
            self.{0} = this.{0}.toJson((depth || 0) - 1);
        }`
                        .replace(/\{0\}/g, f.object_name)
                }).join("\n"))
            .replace(/\{2\}/g, schema
                .fields
                .filter(function (field: IField) { return field.is_fk && Utils.toEnumValue(field.type, FieldType) === FieldType.array; })
                .map(function (field: IField) {
                    return `
        if (depth > 0 && this.{0}.length) {
            self.{0} = this.{0}.map((item: ISerializable)=> {
                return item.toJson((depth || 0) - 1);
            });
        }`
                        .replace(/\{0\}/g, field.name);

                }).join("\n"));
    }

    private static fromJson(schema: ISchema) {

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
                .filter(function (field: IField) { return field.is_fk && Utils.toEnumValue(field.type, FieldType) !== FieldType.array; })
                .map(function (field: IField) {
                    return `
        if (depth && this.Json.{0}) {
            this._{0} = new {1}({});
            this.{0}.fromJson(this.Json.{0}, (depth || 0) - 1);
        }`
                        .replace(/\{0\}/g, field.object_name)
                        .replace(/\{1\}/g, field.object_type)
                })
                .join("\n"))
            .replace(/\{2\}/g, schema
                .fields
                .filter(function (field: IField) { return field.is_fk && Utils.toEnumValue(field.type, FieldType) === FieldType.array })
                .map(function (field: IField) {
                    return `
        if (depth && this.Json.{0} && this.Json.{0}.length) {
            this._{0} = this.Json.{0}.map((item: any) => {
                return new {1}({}).fromJson(item, (depth || 0) - 1);
            });
        }`
                        .replace(/\{0\}/g, field.name)
                        .replace(/\{1\}/g, field.object_type)
                })
                .join("\n"));
    }

    private static save(schema: ISchema) {
        return `
    async Save(): Promise<{0}> {
        throw "not implemented";
    }`
            .replace(/\{0\}/, schema.name);
    }

    private static delete(schema: ISchema) {
        return `
    async Delete(): Promise<{0}> {
        throw "not implemented";
    }`
            .replace(/\{0\}/, schema.name);
    }

}

