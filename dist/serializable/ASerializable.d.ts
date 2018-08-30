import { ISerializable } from './ISerializable';
export declare abstract class ASerializable implements ISerializable {
    private Loaded;
    readonly IsLoaded: boolean;
    readonly LastUpdated: Date;
    readonly HasChanged: boolean;
    protected Map: Map<string, any>;
    protected Json: any;
    constructor();
    protected Get(Name: string, format?: Function): any;
    protected Set(Name: string, value: any, parser?: Function): boolean;
    protected Update({DateTime, HasChanged}: any): void;
    toJson(depth?: number): any;
    fromJson(json: any, depth?: number): void;
    cast<T extends ISerializable>(target: T, depth?: number): T;
}
