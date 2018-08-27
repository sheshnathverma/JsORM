import { ISerializable } from './ISerializable';
export interface IBaseEntity extends ISerializable {
    readonly GUID: string;
    readonly IsNew: boolean;
}
