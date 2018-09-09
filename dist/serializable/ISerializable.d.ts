export interface ISerializable {
    /**
     * readonly Date type property which tell about object has latest updated time
     */
    readonly LastUpdated: Date;
    /**
     * it should return json object from instance of current ISerializable class
     * @param depth what should to depth of serialization
     * @returns json data with minimum level zero
     */
    toJson(depth?: number): any;
    /**
     * it should load json object into instance of current ISerializable class
     * @param depth What should to depth of deserialization
     * @param json json data
     */
    fromJson(json: any, depth?: number): void;
    /**
     * cast method should convert current object into @param target ISerializable object
     * @param target any instance of class ISerializable class
     * @param depth what should to depth of deserialization
     */
    cast<T extends ISerializable>(target: T, depth?: number): T;
}
