import { ISerializable } from '../serializable/ISerializable';
export interface IBaseEntity extends ISerializable {
    readonly GUID: string;
    readonly IsNew: boolean;
    Save(): Promise<IBaseEntity>;
    Delete(): Promise<IBaseEntity>;
}
