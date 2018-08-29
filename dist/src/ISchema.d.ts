export declare enum FieldType {
    array = 0,
    boolean = 1,
    date = 2,
    integer = 3,
    enum = 4,
    number = 5,
    object = 6,
    string = 7,
}
export interface IField {
    name: string;
    type: FieldType;
    is_fk: boolean;
    object_name: string;
    object_type: string;
    readonly: boolean;
}
export interface ISchema {
    name: string;
    extends: string;
    implements: string[];
    fields: IField[];
}
