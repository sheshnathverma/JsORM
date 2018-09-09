
import { ISerializable, ASerializable, IBaseEntity, ABaseEntity, Utils } from '../../../src/index';
import { GenderType } from '../../enum/index'
import { Employee } from "../../Employee"
import { Department } from "../../Department"
import { IEmployee } from "./IEmployee";
import { EmployeeField } from "./EmployeeField";

/**
  * Auto generated BaseEmployee class
  * It has to extends ASerializable class or implements ISerializable or both in direct or indirect
  */
export abstract class BaseEmployee extends ABaseEntity implements IEmployee {
    
    /** Get Name property value as string */
    get Name(): string { return this.Get("Name"); }
    /** Set Name property value as string */
    set Name(value: string) {  
        if(Utils.isString(value)) {
            this.Set("Name", value); 
        } 
        else {
            throw "invalid input for Employee.Name"; 
        }
    }


    /** Get Salary property value as integer */
    get Salary(): number { return Utils.toInteger(this.Get("Salary")); }
    /** Set Salary property value as integer */
    set Salary(value: number) {  
        if(Utils.isNumber(value)) {
            this.Set("Salary", Utils.toInteger(value)); 
        } 
        else {
            throw "invalid input for Employee.Salary"; 
        }
    }


    /** Get Rating property value as number */
    get Rating(): number { return this.Get("Rating"); }
    /** Set Rating property value as number */
    set Rating(value: number) {  
        if(Utils.isNumber(value)) {
            this.Set("Rating", value); 
        } 
        else {
            throw "invalid input for Employee.Rating"; 
        }
    }


    /** Get DOB property value as Date object */
    get DOB(): Date | any { return Utils.toDate(this.Get("DOB")); }
    /** Set DOB property value as Date object */
    set DOB(value: Date | any) {  
        if(Utils.isDate(value)) {
            this.Set("DOB", value); 
        } 
        else {
            throw "invalid input for Employee.DOB"; 
        }
    }


    /** Get IsActive property value as boolean */
    get IsActive(): boolean { return this.Get("IsActive"); }
    /** Set IsActive property value as boolean */
    set IsActive(value: boolean) {  
        if(Utils.isBoolean(value)) {
            this.Set("IsActive", value); 
        } 
        else {
            throw "invalid input for Employee.IsActive"; 
        }
    }


    /** Get NickNames property value as array of string type object */
    get NickNames(): string[] | any[] { return this.Get("NickNames"); }
    /** Set NickNames property value as array of string */
    set NickNames(value: string[] | any[]) { 
        if(Utils.isArray(value)) {
            this.Set("NickNames", value); 
        }
        else {
            throw "invalid input for Employee.NickNames"; 
        }
    }


    /** Get OtherInfo property value as any object */
    get OtherInfo(): any | any { return this.Get("OtherInfo"); }
    /** Set OtherInfo property value as any object */
    set OtherInfo(value: any) { this.Set("OtherInfo", value); }


    /** Get Gender property value as integer of GenderType enum type */
    get Gender(): GenderType { return Utils.toEnumValue(this.Get("Gender"), GenderType); }
    /** Set Gender property value as GenderType enum */
    set Gender(value: GenderType) {  
        if(Utils.isEnum(value, GenderType)) {
            this.Set("Gender", Utils.toEnumValue(value, GenderType)); 
        } 
        else {
            throw "invalid input for Employee.Gender"; 
        }
    }


    private _Manager: Employee | any;
    /** Get ManagerGUID property value as object whick is key of Employee object */
    get ManagerGUID(): any { return this.Get("ManagerGUID"); }    
    /** Get ManagerGUID property value as Employee object and it is readonly */
    get Manager(): Employee | any {
        if (this.ManagerGUID !== null && this.ManagerGUID !== undefined) { 
            return this._Manager; 
        }
        else {
            return null;
        }
    }
    /** Set ManagerGUID property value as Employee object and then load Manager object by calling Manager.fromJson(json) */
    set ManagerGUID(value: any) {
        if (this.Set("ManagerGUID", value)) {
            this._Manager = new Employee({ GUID: value });
        }
    }


    private _Clients: Employee[] | any[];
    /** Get Clients property value as array of Employee and it is readonly*/
    get Clients(): Employee[] {
        if (!this._Clients) {
            this._Clients = Array<Employee>();
        }
        return this._Clients;
    }


    private _PrimaryDepartment: Department | any;
    /** Get DepartmentGUID property value as object whick is key of Department object */
    get DepartmentGUID(): any { return this.Get("DepartmentGUID"); }    
    /** Get DepartmentGUID property value as Department object and it is readonly */
    get PrimaryDepartment(): Department | any {
        if (this.DepartmentGUID !== null && this.DepartmentGUID !== undefined) { 
            return this._PrimaryDepartment; 
        }
        else {
            return null;
        }
    }
    /** Set DepartmentGUID property value as Department object and then load PrimaryDepartment object by calling PrimaryDepartment.fromJson(json) */
    set DepartmentGUID(value: any) {
        if (this.Set("DepartmentGUID", value)) {
            this._PrimaryDepartment = new Department({ GUID: value });
        }
    }


    private _Departments: Department[] | any[];
    /** Get Departments property value as array of Department and it is readonly*/
    get Departments(): Department[] {
        if (!this._Departments) {
            this._Departments = Array<Department>();
        }
        return this._Departments;
    }
    
    /**
      * Auto generated constructor for Employee class
      * @param by default it take GUID as key property 
      */
    constructor({ GUID }: any) {
        super({ GUID });
    }
    
    
    /**
     * Get json object from instance of Employee class
     * @param depth what should to depth of serialization 
     * @returns json data with minimum level zero 
     */
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

        if (depth > 0 && this.PrimaryDepartment) {
            self.PrimaryDepartment = this.PrimaryDepartment.toJson((depth || 0) - 1);
        }

        if (depth > 0 && this.Clients.length) {
            self.Clients = this.Clients.map((item)=> {
                return item.toJson((depth || 0) - 1);
            });
        }

        if (depth > 0 && this.Departments.length) {
            self.Departments = this.Departments.map((item)=> {
                return item.toJson((depth || 0) - 1);
            });
        }
        return self;
    }


    /**
     * load json object into instance of Employee class
     * @param depth What should to depth of deserialization 
     * @param json json data
     */
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
            this.ManagerGUID = this.Json.Manager.GUID;
            this.Manager.fromJson(this.Json.Manager, (depth || 0) - 1);
        }

        if (depth && this.Json.PrimaryDepartment) {
            this._PrimaryDepartment = new Department({});
            this.DepartmentGUID = this.Json.PrimaryDepartment.GUID;
            this.PrimaryDepartment.fromJson(this.Json.PrimaryDepartment, (depth || 0) - 1);
        }

        if (depth && this.Json.Clients && this.Json.Clients.length) {
            this._Clients = this.Json.Clients.map((item: any) => {
                return new Employee({}).fromJson(item, (depth || 0) - 1);
            });
        }

        if (depth && this.Json.Departments && this.Json.Departments.length) {
            this._Departments = this.Json.Departments.map((item: any) => {
                return new Department({}).fromJson(item, (depth || 0) - 1);
            });
        }
    }

    abstract async Save(): Promise<BaseEmployee>;
    abstract async Delete(): Promise<BaseEmployee>;
}