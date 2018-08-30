import { IField } from "./IField";

export interface ISchema {
    name: string;
    path: string;
    extends: string;
    implements: string[];
    fields: IField[];
}