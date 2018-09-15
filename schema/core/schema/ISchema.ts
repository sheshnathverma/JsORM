import { IField } from "./IField";

export interface ISchema {
    name: string;
    extends: string;
    //implements: string[];
    fields: IField[];
}