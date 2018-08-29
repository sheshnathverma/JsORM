export enum FieldType {
    array,
    boolean,
    date,
    integer,
    enum,
    number,
    object,
    string    
};

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