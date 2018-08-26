export namespace JsORM {
    export abstract class ASerializable implements ISerializable {
        private Loaded: boolean;
        get IsLoaded(): boolean {
            return this.Loaded;
        }

        get LastUpdated(): Date {
            return this.Get("LastUpdated");
        }

        get HasChanged(): boolean {
            return !!this.Get("HasChanged");
        }

        protected Map: Map<string, any>;
        protected Json: any = {};

        constructor() {
            this.Json = {};
            this.Map = new Map();
            this.Update({ DateTime: new Date(), HasChanged: false });
        }

        protected Get(Name: string, format?: Function) {
            format = format || function (v) { return v };
            return format(this.Map.get(Name));
        }

        protected Set(Name: string, value: any, parser?: Function): boolean {
            parser = parser || function (v) { return v };
            if (!Object.is(this.Map.get(Name), parser(value))) {
                this.Map.set(Name, parser(value));
                this.Update({});
                return true;
            }
            return false;
        }

        protected Update({ DateTime, HasChanged }: any): void {
            this.Map.set("LastUpdated", DateTime || new Date());
            this.Map.set("HasChanged", HasChanged === true);
        }

        toJson(depth?: number): any {
            let self = {};
            self["LastUpdated"] = this.Get("LastUpdated");
            return self;
        }

        fromJson(json: any, depth?: number): void {
            this.Json = json || {};
            this.Map = new Map();
            this.Loaded = true;
            this.Update({});
        }

        cast<T extends ISerializable>(target: T, depth?: number): T {
            depth = depth || 0;
            target.fromJson(this.toJson(depth));
            return target;
        }
    }
}
