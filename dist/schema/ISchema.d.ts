import { IField } from "./IField";
export interface ISchema {
    name: string;
    extends: string;
    fields: IField[];
}
