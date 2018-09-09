import { ISerializable } from './ISerializable';
/**
 * Abstract base class which has basic implements of ISerializable interface */
export declare abstract class ASerializable implements ISerializable {
    private _loaded;
    private readonly _promises;
    /**
     * readonly boolean property which will tell about object has loaded or not
     */
    readonly IsLoaded: boolean;
    /**
     * readonly Date type property which tell about object has latest updated time
     */
    readonly LastUpdated: Date;
    /**
     * readonly boolean property which will tell about object has changed
     */
    readonly HasChanged: boolean;
    /**
     * It is Map object which is only contain actual properties related to current class
     */
    protected Map: Map<string, any>;
    /**
     * It is initial json object we keep this object in memory.
     * this object help in type casting and we can set all available properties of target type object without losing data
     */
    protected Json: any;
    /**
     * It is end constructor of ISerializable type object
     */
    constructor();
    /**
     * get property value and can pass formater to get data in desire format
     * @param Name name of property
     * @param format formater function to get value in desire format
     */
    protected Get(Name: string, format?: Function): any;
    /**
     * set property value and can format value before commit in dataset
     * @param Name name of property
     * @param value value of property
     * @param parser parser function apply before commit change value in dataset
     */
    protected Set(Name: string, value: any, parser?: Function): boolean;
    /**
     * it will explicitly save last updated and any changes has been done
     * @param param0 object which can have DateTime and HasChanged properties
     */
    protected Update({DateTime, HasChanged}: any): void;
    /**
     * Check if any promise waiting to finish
     * @returns true if any promise waiting related to this */
    IsPromiseWaiting(): boolean;
    /**
     * Creates a new Promise.
     * @param executor A callback used to initialize the promise. This callback is passed two arguments:
     * a resolve callback used resolve the promise with a value or the result of another promise,
     * and a reject callback used to reject the promise with a provided reason or error.
     */
    NewPromise<T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
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
    /**
     * cast current object into @param target ISerializable object
     * @param target any instance of class ISerializable class
     * @param depth what should to depth of deserialization
     */
    cast<T extends ISerializable>(target: T, depth?: number): T;
}
