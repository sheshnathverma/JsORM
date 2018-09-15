
import { IBaseEntity } from './IBaseEntity';
import { ASerializable } from '../serializable/ASerializable';

/**
 * Fields of IBaseEntity as enum object */
export enum ABaseEntityField {
    GUID
}

/**
 * ABaseEntity is extended interface of IBaseEntity */
export abstract class ABaseEntity extends ASerializable implements IBaseEntity {

    /** it is key of any IBaseEntity type of class */
    get GUID(): string {
        return this.Get("GUID") || null;
    }

    /** it is true if object is newly created */
    get IsNew(): boolean {
        return !!this.Get("GUID");
    }

    /**
     * get instance of any ABaseEntity class and it will assign GUID propetiy if object has key GUID
     * @param param0 optional object {GUID}
     */
    constructor({ GUID }: any) {
        super();
        this.Set("GUID", GUID);
        this.Update({ DateTime: new Date(), HasChanged: !GUID });
    }

    /**
     * Get json object from instance of current class
     * @param depth what should to depth of serialization 
     * @returns json data with minimum level zero 
     */
    toJson(depth?: number): any {
        depth = depth || 0;
        let self = super.toJson(depth);
        Object
            .keys(ABaseEntityField)
            .filter((k: any) => !isNaN(Number(k)))
            .map((k: any) => [ABaseEntityField[k], this.Json[ABaseEntityField[k]]])
            .forEach((v) => self[v[0]] = v[1]);
        return self;
    }

    /**
     * load json object into instance of current class
     * @param depth What should to depth of deserialization 
     * @param json json data
     */
    fromJson(json: any, depth?: number): void {
        depth = depth || 0;
        super.fromJson(json, depth);
        Object
            .keys(ABaseEntityField)
            .filter((k: any) => !isNaN(Number(k)))
            .map((k: any) => [ABaseEntityField[k], this.Json[ABaseEntityField[k]]])
            .forEach((v) => this.Set(v[0], v[1]));
    }

    /** implement asyn save method */
    abstract async Save(): Promise<ABaseEntity>;
    /** implement asyn delete method */
    abstract Delete(): Promise<ABaseEntity>;
}
