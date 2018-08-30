
import { IBaseEntity } from './IBaseEntity';
import { ASerializable } from '../serializable/ASerializable';

export enum ABaseEntityField {
    GUID
}

export abstract class ABaseEntity extends ASerializable implements IBaseEntity {

    get GUID(): string {
        return this.Get("GUID") || null;
    }

    get IsNew(): boolean {
        return !!this.Get("GUID");
    }

    constructor({ GUID }: any) {
        super();
        this.Set("GUID", GUID);
        this.Update({ DateTime: new Date(), HasChanged: !GUID });
    }

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

    fromJson(json: any, depth?: number): void {
        depth = depth || 0;
        super.fromJson(json, depth);
        Object
            .keys(ABaseEntityField)
            .filter((k: any) => !isNaN(Number(k)))
            .map((k: any) => [ABaseEntityField[k], this.Json[ABaseEntityField[k]]])
            .forEach((v) => this.Set(v[0], v[1]));
    }

    abstract async Save(): Promise<ABaseEntity>;
    abstract Delete(): Promise<ABaseEntity>;
}
