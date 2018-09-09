import { ISchema } from "../schema/ISchema";
export declare class Generator {
    static Generate(schemas: ISchema[]): {
        dependancy: string;
        interface: string;
        enum: string;
        base: string;
        class: string;
    }[];
    static getImportDependancy(): string;
    static getEnumDependancy(schema: ISchema): string[];
    static getObjectDependancy(schema: ISchema): string[];
    private static getInterface(schema);
    private static getClass(schema);
    private static getEnum(schema);
    private static getBaseClass(schema);
    private static getProperties(schema);
    private static getProperty(field, schema);
    private static toJson(schema);
    private static fromJson(schema);
    private static save(schema);
    private static delete(schema);
}
