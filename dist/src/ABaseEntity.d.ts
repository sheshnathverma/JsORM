import { IBaseEntity } from './IBaseEntity';
import { ASerializable } from './ASerializable';
export declare enum ABaseEntityField {
    GUID = 0,
}
export declare abstract class ABaseEntity extends ASerializable implements IBaseEntity {
    readonly GUID: string;
    readonly IsNew: boolean;
    constructor({GUID}: any);
    toJson(depth?: number): any;
    fromJson(json: any, depth?: number): void;
    abstract Save(): Promise<ABaseEntity>;
    abstract Delete(): Promise<ABaseEntity>;
}
