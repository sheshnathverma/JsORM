
/*
import { ISerializable } from './ISerializable';
import { ASerializable } from './ASerializable';
import { IBaseEntity } from './IBaseEntity';
import { ABaseEntity } from './ABaseEntity';
import { Utils } from './Utils'; */



/**
import { IEmployee } from "./IEmployee";*/

/**
  * Auto generated BaseEmployee class
  * It has to extends ASerializable class or implements ISerializable or both in direct or indirect
  */
export class BaseEmployee extends ABaseEntity implements IEmployee, IBaseEntity {
    
    get Name(): string { return this.Get("Name"); }
    set Name(value: string) {  
        if(Utils.isString(value)) {
            this.Set("Name", value); 
        } 
        else {
            throw "invalid input for Employee.Name"; 
        }
    }


    get DOB(): Date | any { return Utils.toDate(this.Get("DOB")); }
    set DOB(value: Date | any) {  
        if(Utils.isDate(value)) {
            this.Set("DOB", value); 
        } 
        else {
            throw "invalid input for Employee.DOB"; 
        }
    }


    get ManagerGUID(): string { return this.Get("ManagerGUID"); }
    set ManagerGUID(value: string) {  
        if(Utils.isString(value)) {
            this.Set("ManagerGUID", value); 
        } 
        else {
            throw "invalid input for Employee.ManagerGUID"; 
        }
    }


    get DepartmentGUID(): string { return this.Get("DepartmentGUID"); }
    set DepartmentGUID(value: string) {  
        if(Utils.isString(value)) {
            this.Set("DepartmentGUID", value); 
        } 
        else {
            throw "invalid input for Employee.DepartmentGUID"; 
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
            self.Clients = this.Clients.map((item: ISerializable)=> {
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