import { IBaseEntity } from './IBaseEntity';
import { ASerializable } from '../serializable/ASerializable';
/**
 * Fields of IBaseEntity as enum object */
export declare enum ABaseEntityField {
    GUID = 0,
}
/**
 * ABaseEntity is extended interface of IBaseEntity */
export declare abstract class ABaseEntity extends ASerializable implements IBaseEntity {
    /** it is key of any IBaseEntity type of class */
    readonly GUID: string;
    /** it is true if object is newly created */
    readonly IsNew: boolean;
    /**
     * get instance of any ABaseEntity class and it will assign GUID propetiy if object has key GUID
     * @param param0 optional object {GUID}
     */
    constructor({GUID}: any);
    /**
     * Get json object from instance of current class
     * @param depth what should to depth of serialization
     * @returns json data with minimum level zero
     */
    toJson(depth?: number): any;
    /**
     * load json object into instance of current class
     * @param depth What should to depth of deserialization
     * @param json json data
     */
    fromJson(json: any, depth?: number): void;
    /** implement asyn save method */
    abstract Save(): Promise<ABaseEntity>;
    /** implement asyn delete method */
    abstract Delete(): Promise<ABaseEntity>;
}
