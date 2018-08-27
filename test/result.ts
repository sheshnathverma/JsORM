    enum EmployeeField {
        Name,
        DOB,
        ManagerGUID
    }


    export class Employee extends ABaseEntity implements IBaseEntity {

        get Name(): string { return this.Get("Name"); }
        set Name(value: string) { this.Set("Name", value); }

        get DOB(): Date { return this.Get("DOB"); }

        get ManagerGUID(): string {
            return this.Get("ManagerGUID");
        }
        set ManagerGUID(value: string) {
            if (this.Set("ManagerGUID", value)) {
                this._Manager = new Employee({ GUID: value });
            }
        }

        private _Manager: Employee;
        get Manager(): Employee {
            if (this.ManagerGUID) {
                return this._Manager;
            }
            return null;
        }


        constructor({ GUID }: any) {
            super({ GUID });
        }


        toJson(depth ? : number): any {
            depth = depth || 0;
            let self = super.toJson(depth);

            Object
                .keys(EmployeeField)
                .filter((k: any) => !isNaN(Number(k)))
                .map((k: any) => [EmployeeField[k], this.Json[EmployeeField[k]]])
                .forEach((v) => self[v[0]] = v[1]);

            if (depth > 0 && this.Manager) {
                self.Manager = this.Manager.toJson((depth - 1));
            }


            return self;
        }


        fromJson(json: any, depth ? : number): void {
            depth = depth || 0;
            super.fromJson(json, depth);

            Object
                .keys(EmployeeField)
                .filter((k: any) => !isNaN(Number(k)))
                .map((k: any) => [EmployeeField[k], this.Json[EmployeeField[k]]])
                .forEach((v) => this.Map.set(v[0], v[1]));

            if (depth && this.Json.Manager) {
                this._Manager = new Employee({});
                this.Manager.fromJson(this.Json.Manager, (depth - 1));
            }


        }
    }



    enum DepartmentField {
        Name
    }


    export class Department extends ABaseEntity implements IBaseEntity {

        get Name(): string { return this.Get("Name"); }
        set Name(value: string) { this.Set("Name", value); }

        private _Employees: Employee[];
        get Employees(): Employee[] {
            if (!this._Employees) {
                this._Employees = Array < Employee > ();
            }
            return this._Employees;
        }


        constructor({ GUID }: any) {
            super({ GUID });
        }


        toJson(depth ? : number): any {
            depth = depth || 0;
            let self = super.toJson(depth);

            Object
                .keys(DepartmentField)
                .filter((k: any) => !isNaN(Number(k)))
                .map((k: any) => [DepartmentField[k], this.Json[DepartmentField[k]]])
                .forEach((v) => self[v[0]] = v[1]);



            if (depth > 0 && this.Employees) {
                self.Employees = this.Employees.map((item) => {
                    return item.toJson(depth - 1);
                });
            }

            return self;
        }


        fromJson(json: any, depth ? : number): void {
            depth = depth || 0;
            super.fromJson(json, depth);

            Object
                .keys(DepartmentField)
                .filter((k: any) => !isNaN(Number(k)))
                .map((k: any) => [DepartmentField[k], this.Json[DepartmentField[k]]])
                .forEach((v) => this.Map.set(v[0], v[1]));


            if (depth && this.Json.Employees && this.Json.Employees.length) {
                this._Employees = this.Json.Employees.map((item) => {
                    return new Employee({}).fromJson(item, depth - 1);
                });
            }
        }
    }