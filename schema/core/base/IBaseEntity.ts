import { ISerializable } from '../serializable/ISerializable';

/**
 * this is extended interface of ISerializable */
export interface IBaseEntity extends ISerializable {
    /** it is key of any IBaseEntity type of class */
    readonly GUID: string;

    /** it is true if object is newly created */
    readonly IsNew: boolean;

    /** implement asyn save method */
    Save(): Promise<IBaseEntity>;

    /** implement asyn delete method */
    Delete(): Promise<IBaseEntity>;    
}

