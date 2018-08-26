export interface ISerializable {
    readonly LastUpdated: Date;
    toJson(depth?: number): any;
    fromJson(json: any, depth?: number): void;
    cast<T extends ISerializable>(target: T, depth?: number): T;
}
