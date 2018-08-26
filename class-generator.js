function generate(schema) {
    function getProperties(schema) {
        return schema.fields.map(function (field) {
            let newLines = [];
            if (!field.entityName && !field.isArray) {
                newLines.push(`        get {0}(): {1} { return this.Get("{0}"); }`
                    .replace(/\{0\}/g, field.name)
                    .replace(/\{1\}/g, field.type));
            }

            if (!field.entityName && !field.isArray && !field.readonly) {
                newLines.push('        set {0}(value) { this.Set("{0}", value); }'
                    .replace(/\{0\}/g, field.name))
            }

            if (field.isArray) {
                newLines.push(
                    `        private _{0}: {1}[];
        get {0}(): {1}[] {
            if (!this._{0}) {
                this._{0} = Array<{1}>();
            }
            return this._{0};
        }
`
                        .replace(/\{0\}/g, field.name)
                        .replace(/\{1\}/g, field.type));
            }
            else if (field.entityName && !field.isArray) {
                newLines.push(`        get {0}(): {1} {
            return this.Get("{0}");
        }
        set {0}(value: {1}) {
            if (this.Set("{0}", value)) {
                this._{2} = new {3}({ GUID: value });
            }
        }

        private _{2}: {3};
        get {2}(): {3} {
            if (this.{0}) {
                return this._{2};
            }
           return null;
        }
`
                    .replace(/\{0\}/g, field.name)
                    .replace(/\{1\}/g, field.type)
                    .replace(/\{2\}/g, field.entityName)
                    .replace(/\{3\}/g, field.entityType)
                );
            }

            return newLines.join("\n");
        })
            .join("\n\n");
    }

    function toJson(schema) {
        return `        toJson(depth?: number): any {
            depth = depth || 0;
            let self = super.toJson(depth);

            Object
                .keys({0}Field)
                .filter((k) => !isNaN(Number(k)))
                .map((k) => [{0}Field[k], this.Json[{0}Field[k]]])
                .forEach((v) => self[v[0]] = v[1]);

{1}

{2}
            return self;
        }
`
            .replace(/\{0\}/g, schema.class)
            .replace(/\{1\}/g, schema
                .fields
                .filter(function (f) { return !!f.entityName })
                .map(function (f) {
                    return `            if (depth > 0 && this.{0}) {
                self.{0} = this.{0}.toJson((depth - 1));
            }`
                        .replace(/\{0\}/g, f.entityName)
                })
                .join("\n"))
            .replace(/\{2\}/g, schema
                .fields
                .filter(function (f) { return f.isArray })
                .map(function (f) {
                    return `            if (depth > 0 && this.{0}) {
                self.{0} = this.{0}.map((item) => {
                    return item.toJson(depth - 1);
                });
            }
`
                        .replace(/\{0\}/g, f.name)
                })
                .join("\n"));
    }

    function fromJson(schema) {
        return `        fromJson(json: any, depth?: number): void {
            depth = depth || 0;
            super.fromJson(json, depth);

            Object
                .keys({0}Field)
                .filter((k) => !isNaN(Number(k)))
                .map((k) => [{0}Field[k], this.Json[{0}Field[k]]])
                .forEach((v) => this.Map.set(v[0], v[1]));

{1}
{2}
        }`
            .replace(/\{0\}/g, schema.class)
            .replace(/\{1\}/g, schema
                .fields
                .filter(function (f) { return !!f.entityName })
                .map(function (f) {
                    return `            if (depth && this.Json.{0}) {
                this._{0} = new {1}({});
                this.{0}.fromJson(this.Json.{0}, (depth - 1));
            }
`
                        .replace(/\{0\}/g, f.entityName)
                        .replace(/\{1\}/g, fentityType)
                })
                .join("\n"))
            .replace(/\{2\}/g, schema
                .fields
                .filter(function (f) { return f.isArray })
                .map(function (f) {
                    return `            if (depth && this.Json.{0} && this.Json.{0}.length) {
                this._{0} = this.Json.{0}.map((item) => {
                    return new {1}({}).fromJson(item, depth - 1);
                });
            }`
                        .replace(/\{0\}/g, f.name)
                        .replace(/\{1\}/g, f.type)
                })
                .join("\n"));
    }

    function getClass(schema) {
        return `    export class {0} extends {1}  implements {2} {

{3}

        constructor({ GUID }: any) {
            super({ GUID });
        }


{4}
    }`
            .replace(/\{0\}/g, schema.class)
            .replace(/\{1\}/g, schema.extends || "ABaseEntity")
            .replace(/\{2\}/g, (schema.implements || []).join(", ") || "IBaseEntity")
            .replace(/\{3\}/g, getProperties(schema))
            .replace(/\{4\}/g, [toJson(schema), fromJson(schema)].join("\n\n"));
    }

    function getEnum(schema) {
        return `    enum {0}Field {
        {1}
    }
`
            .replace(/\{0\}/g, schema.class)
            .replace(/\{1\}/g, schema.fields.filter(function (f) { return (!f.isArray); }).map(function (f) { return f.name }).join(",\n        "));
    }

    return [schema.namespace ? 'export namespace ' + schema.namespace + '{' : '', getEnum(schema), getClass(schema), schema.namespace ? '}' : ''].join('\n\n');
}
