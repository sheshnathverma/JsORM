import { ISchema } from "ISchema";
export declare class Generator {
    static Generate(schemas: ISchema[]): string;
    private static getImportDependancy();
    private static getClassFieldEnum(schema);
    private static getClass(schema);
    private static getProperties(schema);
    private static getProperty(field, schema);
    private static toJson(schema);
    private static fromJson(schema);
    private static save(schema);
    private static delete(schema);
}
