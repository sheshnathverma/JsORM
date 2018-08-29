import { ISerializable, ASerializable, IBaseEntity, ABaseEntity, Utils } from '../dist/src/index';

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
enum EmployeeField {
    Name,
    DOB,
    ManagerGUID,
    DepartmentGUID
}



/**
  * Auto generated Employee class
  * It has to extends ASerializable class or implements ISerializable or both in direct or indirect
  */
export class Employee extends ABaseEntity implements IBaseEntity {

    get Name(): string { return this.Get("Name"); }
    set Name(value: string) {
        if (Utils.isString(value)) {
            this.Set("Name", value);
        }
        else {
            throw "invalid input for Employee.Name";
        }
    }


    get DOB(): Date | any { return Utils.toDate(this.Get("DOB")); }
    set DOB(value: Date | any) {
        if (Utils.isDate(value)) {
            this.Set("DOB", value);
        }
        else {
            throw "invalid input for Employee.DOB";
        }
    }


    private _Manager: Employee | any;
    get ManagerGUID(): any { return this.Get("ManagerGUID"); }
    get Manager(): Employee | any {
        if (this.ManagerGUID !== null && this.ManagerGUID !== undefined) {
            return this._Manager;
        }
        else {
            return null;
        }
    }
    set ManagerGUID(value: any) {
        if (this.Set("ManagerGUID", value)) {
            this._Manager = new Employee({ GUID: value });
        }
    }


    private _Department: Department | any;
    get DepartmentGUID(): any { return this.Get("DepartmentGUID"); }
    get Department(): Department | any {
        if (this.DepartmentGUID !== null && this.DepartmentGUID !== undefined) {
            return this._Department;
        }
        else {
            return null;
        }
    }
    set DepartmentGUID(value: any) {
        if (this.Set("DepartmentGUID", value)) {
            this._Department = new Department({ GUID: value });
        }
    }


    private _Clients: Employee[] | any;
    get Clients(): Employee[] | any {
        if (!this._Clients) {
            this._Clients = Array<Employee>();
        }
        return this._Clients;
    }

    /**
      * Auto generated constructor for Employee class
      * @param by default it take GUID as key property 
      */
    constructor({ GUID }: any) {
        super({ GUID });
    }


    async Save(): Promise<Employee> {
        throw "not implemented";
    }


    async Delete(): Promise<Employee> {
        throw "not implemented";
    }


    toJson(depth?: number): any {
        depth = depth || 0;
        let self = super.toJson(depth);

        Object
            .keys(EmployeeField)
            .filter((k: any) => !isNaN(Number(k)))
            .map((k: any) => [EmployeeField[k], this.Json[EmployeeField[k]]])
            .forEach((v) => self[v[0]] = v[1]);


        if (depth > 0 && this.Manager) {
            self.Manager = this.Manager.toJson((depth || 0) - 1);
        }

        if (depth > 0 && this.Department) {
            self.Department = this.Department.toJson((depth || 0) - 1);
        }

        if (depth > 0 && this.Clients.length) {
            self.Clients = this.Clients.map((item: ISerializable) => {
                return item.toJson((depth || 0) - 1);
            });
        }
        return self;
    }


    fromJson(json: any, depth?: number): void {
        depth = depth || 0;
        super.fromJson(json, depth);

        Object
            .keys(EmployeeField)
            .filter((k: any) => !isNaN(Number(k)))
            .map((k: any) => [EmployeeField[k], this.Json[EmployeeField[k]]])
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
            this._Clients = this.Json.Clients.map((item: any) => {
                return new Employee({}).fromJson(item, (depth || 0) - 1);
            });
        }
    }
}





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
enum DepartmentField {
    Name,
    HigherDepartmentGUID
}



/**
  * Auto generated Department class
  * It has to extends ASerializable class or implements ISerializable or both in direct or indirect
  */
export class Department extends ABaseEntity implements IBaseEntity {

    get Name(): string { return this.Get("Name"); }
    set Name(value: string) {
        if (Utils.isString(value)) {
            this.Set("Name", value);
        }
        else {
            throw "invalid input for Department.Name";
        }
    }


    private _Employees: Employee[] | any;
    get Employees(): Employee[] | any {
        if (!this._Employees) {
            this._Employees = Array<Employee>();
        }
        return this._Employees;
    }


    private _HigherDepartment: Department | any;
    get HigherDepartmentGUID(): any { return this.Get("HigherDepartmentGUID"); }
    get HigherDepartment(): Department | any {
        if (this.HigherDepartmentGUID !== null && this.HigherDepartmentGUID !== undefined) {
            return this._HigherDepartment;
        }
        else {
            return null;
        }
    }
    set HigherDepartmentGUID(value: any) {
        if (this.Set("HigherDepartmentGUID", value)) {
            this._HigherDepartment = new Department({ GUID: value });
        }
    }


    private _SubDepartments: Department[] | any;
    get SubDepartments(): Department[] | any {
        if (!this._SubDepartments) {
            this._SubDepartments = Array<Department>();
        }
        return this._SubDepartments;
    }

    /**
      * Auto generated constructor for Department class
      * @param by default it take GUID as key property 
      */
    constructor({ GUID }: any) {
        super({ GUID });
    }


    async Save(): Promise<Department> {
        throw "not implemented";
    }


    async Delete(): Promise<Department> {
        throw "not implemented";
    }


    toJson(depth?: number): any {
        depth = depth || 0;
        let self = super.toJson(depth);

        Object
            .keys(DepartmentField)
            .filter((k: any) => !isNaN(Number(k)))
            .map((k: any) => [DepartmentField[k], this.Json[DepartmentField[k]]])
            .forEach((v) => self[v[0]] = v[1]);


        if (depth > 0 && this.HigherDepartment) {
            self.HigherDepartment = this.HigherDepartment.toJson((depth || 0) - 1);
        }

        if (depth > 0 && this.Employees.length) {
            self.Employees = this.Employees.map((item: ISerializable) => {
                return item.toJson((depth || 0) - 1);
            });
        }

        if (depth > 0 && this.SubDepartments.length) {
            self.SubDepartments = this.SubDepartments.map((item: ISerializable) => {
                return item.toJson((depth || 0) - 1);
            });
        }
        return self;
    }


    fromJson(json: any, depth?: number): void {
        depth = depth || 0;
        super.fromJson(json, depth);

        Object
            .keys(DepartmentField)
            .filter((k: any) => !isNaN(Number(k)))
            .map((k: any) => [DepartmentField[k], this.Json[DepartmentField[k]]])
            .forEach((v) => this.Map.set(v[0], v[1]));


        if (depth && this.Json.HigherDepartment) {
            this._HigherDepartment = new Department({});
            this.HigherDepartment.fromJson(this.Json.HigherDepartment, (depth || 0) - 1);
        }

        if (depth && this.Json.Employees && this.Json.Employees.length) {
            this._Employees = this.Json.Employees.map((item: any) => {
                return new Employee({}).fromJson(item, (depth || 0) - 1);
            });
        }

        if (depth && this.Json.SubDepartments && this.Json.SubDepartments.length) {
            this._SubDepartments = this.Json.SubDepartments.map((item: any) => {
                return new Department({}).fromJson(item, (depth || 0) - 1);
            });
        }
    }
}