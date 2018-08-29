System.register(["../dist/src/index"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, EmployeeField, Employee, DepartmentField, Department;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            /*
            import { ISerializable } from './ISerializable';
            import { ASerializable } from './ASerializable';
            import { IBaseEntity } from './IBaseEntity';
            import { ABaseEntity } from './ABaseEntity';
            import { Utils } from './Utils'; */
            /**
              * Auto generated field enum for Employee class
              * It enum contains all fields exclude foreign key list object
              */
            (function (EmployeeField) {
                EmployeeField[EmployeeField["Name"] = 0] = "Name";
                EmployeeField[EmployeeField["DOB"] = 1] = "DOB";
                EmployeeField[EmployeeField["ManagerGUID"] = 2] = "ManagerGUID";
                EmployeeField[EmployeeField["DepartmentGUID"] = 3] = "DepartmentGUID";
            })(EmployeeField || (EmployeeField = {}));
            /**
              * Auto generated Employee class
              * It has to extends ASerializable class or implements ISerializable or both in direct or indirect
              */
            Employee = class Employee extends index_1.ABaseEntity {
                get Name() { return this.Get("Name"); }
                set Name(value) {
                    if (index_1.Utils.isString(value)) {
                        this.Set("Name", value);
                    }
                    else {
                        throw "invalid input for Employee.Name";
                    }
                }
                get DOB() { return index_1.Utils.toDate(this.Get("DOB")); }
                set DOB(value) {
                    if (index_1.Utils.isDate(value)) {
                        this.Set("DOB", value);
                    }
                    else {
                        throw "invalid input for Employee.DOB";
                    }
                }
                get ManagerGUID() { return this.Get("ManagerGUID"); }
                get Manager() {
                    if (this.ManagerGUID !== null && this.ManagerGUID !== undefined) {
                        return this._Manager;
                    }
                    else {
                        return null;
                    }
                }
                set ManagerGUID(value) {
                    if (this.Set("ManagerGUID", value)) {
                        this._Manager = new Employee({ GUID: value });
                    }
                }
                get DepartmentGUID() { return this.Get("DepartmentGUID"); }
                get Department() {
                    if (this.DepartmentGUID !== null && this.DepartmentGUID !== undefined) {
                        return this._Department;
                    }
                    else {
                        return null;
                    }
                }
                set DepartmentGUID(value) {
                    if (this.Set("DepartmentGUID", value)) {
                        this._Department = new Department({ GUID: value });
                    }
                }
                get Clients() {
                    if (!this._Clients) {
                        this._Clients = Array();
                    }
                    return this._Clients;
                }
                /**
                  * Auto generated constructor for Employee class
                  * @param by default it take GUID as key property
                  */
                constructor({ GUID }) {
                    super({ GUID });
                }
                Save() {
                    return __awaiter(this, void 0, void 0, function* () {
                        throw "not implemented";
                    });
                }
                Delete() {
                    return __awaiter(this, void 0, void 0, function* () {
                        throw "not implemented";
                    });
                }
                toJson(depth) {
                    depth = depth || 0;
                    let self = super.toJson(depth);
                    Object
                        .keys(EmployeeField)
                        .filter((k) => !isNaN(Number(k)))
                        .map((k) => [EmployeeField[k], this.Json[EmployeeField[k]]])
                        .forEach((v) => self[v[0]] = v[1]);
                    if (depth > 0 && this.Manager) {
                        self.Manager = this.Manager.toJson((depth || 0) - 1);
                    }
                    if (depth > 0 && this.Department) {
                        self.Department = this.Department.toJson((depth || 0) - 1);
                    }
                    if (depth > 0 && this.Clients.length) {
                        self.Clients = this.Clients.map((item) => {
                            return item.toJson((depth || 0) - 1);
                        });
                    }
                    return self;
                }
                fromJson(json, depth) {
                    depth = depth || 0;
                    super.fromJson(json, depth);
                    Object
                        .keys(EmployeeField)
                        .filter((k) => !isNaN(Number(k)))
                        .map((k) => [EmployeeField[k], this.Json[EmployeeField[k]]])
                        .forEach((v) => this.Map.set(v[0], v[1]));
                    if (depth && this.Json.Manager) {
                        this._Manager = new Employee({});
                        this.Manager.fromJson(this.Json.Manager, (depth || 0) - 1);
                    }
                    if (depth && this.Json.Department) {
                        this._Department = new Department({});
                        this.Department.fromJson(this.Json.Department, (depth || 0) - 1);
                    }
                    if (depth && this.Json.Clients && this.Json.Clients.length) {
                        this._Clients = this.Json.Clients.map((item) => {
                            return new Employee({}).fromJson(item, (depth || 0) - 1);
                        });
                    }
                }
            };
            exports_1("Employee", Employee);
            /*
            import { ISerializable } from './ISerializable';
            import { ASerializable } from './ASerializable';
            import { IBaseEntity } from './IBaseEntity';
            import { ABaseEntity } from './ABaseEntity';
            import { Utils } from './Utils'; */
            /**
              * Auto generated field enum for Department class
              * It enum contains all fields exclude foreign key list object
              */
            (function (DepartmentField) {
                DepartmentField[DepartmentField["Name"] = 0] = "Name";
                DepartmentField[DepartmentField["HigherDepartmentGUID"] = 1] = "HigherDepartmentGUID";
            })(DepartmentField || (DepartmentField = {}));
            /**
              * Auto generated Department class
              * It has to extends ASerializable class or implements ISerializable or both in direct or indirect
              */
            Department = class Department extends index_1.ABaseEntity {
                get Name() { return this.Get("Name"); }
                set Name(value) {
                    if (index_1.Utils.isString(value)) {
                        this.Set("Name", value);
                    }
                    else {
                        throw "invalid input for Department.Name";
                    }
                }
                get Employees() {
                    if (!this._Employees) {
                        this._Employees = Array();
                    }
                    return this._Employees;
                }
                get HigherDepartmentGUID() { return this.Get("HigherDepartmentGUID"); }
                get HigherDepartment() {
                    if (this.HigherDepartmentGUID !== null && this.HigherDepartmentGUID !== undefined) {
                        return this._HigherDepartment;
                    }
                    else {
                        return null;
                    }
                }
                set HigherDepartmentGUID(value) {
                    if (this.Set("HigherDepartmentGUID", value)) {
                        this._HigherDepartment = new Department({ GUID: value });
                    }
                }
                get SubDepartments() {
                    if (!this._SubDepartments) {
                        this._SubDepartments = Array();
                    }
                    return this._SubDepartments;
                }
                /**
                  * Auto generated constructor for Department class
                  * @param by default it take GUID as key property
                  */
                constructor({ GUID }) {
                    super({ GUID });
                }
                Save() {
                    return __awaiter(this, void 0, void 0, function* () {
                        throw "not implemented";
                    });
                }
                Delete() {
                    return __awaiter(this, void 0, void 0, function* () {
                        throw "not implemented";
                    });
                }
                toJson(depth) {
                    depth = depth || 0;
                    let self = super.toJson(depth);
                    Object
                        .keys(DepartmentField)
                        .filter((k) => !isNaN(Number(k)))
                        .map((k) => [DepartmentField[k], this.Json[DepartmentField[k]]])
                        .forEach((v) => self[v[0]] = v[1]);
                    if (depth > 0 && this.HigherDepartment) {
                        self.HigherDepartment = this.HigherDepartment.toJson((depth || 0) - 1);
                    }
                    if (depth > 0 && this.Employees.length) {
                        self.Employees = this.Employees.map((item) => {
                            return item.toJson((depth || 0) - 1);
                        });
                    }
                    if (depth > 0 && this.SubDepartments.length) {
                        self.SubDepartments = this.SubDepartments.map((item) => {
                            return item.toJson((depth || 0) - 1);
                        });
                    }
                    return self;
                }
                fromJson(json, depth) {
                    depth = depth || 0;
                    super.fromJson(json, depth);
                    Object
                        .keys(DepartmentField)
                        .filter((k) => !isNaN(Number(k)))
                        .map((k) => [DepartmentField[k], this.Json[DepartmentField[k]]])
                        .forEach((v) => this.Map.set(v[0], v[1]));
                    if (depth && this.Json.HigherDepartment) {
                        this._HigherDepartment = new Department({});
                        this.HigherDepartment.fromJson(this.Json.HigherDepartment, (depth || 0) - 1);
                    }
                    if (depth && this.Json.Employees && this.Json.Employees.length) {
                        this._Employees = this.Json.Employees.map((item) => {
                            return new Employee({}).fromJson(item, (depth || 0) - 1);
                        });
                    }
                    if (depth && this.Json.SubDepartments && this.Json.SubDepartments.length) {
                        this._SubDepartments = this.Json.SubDepartments.map((item) => {
                            return new Department({}).fromJson(item, (depth || 0) - 1);
                        });
                    }
                }
            };
            exports_1("Department", Department);
        }
    };
});
//# sourceMappingURL=result.js.map