import { FieldType } from "./FieldType";
export interface IField {
    name: string;
    type: FieldType;
    is_fk: boolean;
    object_name: string;
    object_type: string;
    readonly: boolean;
}
