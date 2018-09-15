
import { ISerializable, ASerializable, IBaseEntity, ABaseEntity, Utils } from '../../core/index';
import {  } from '../../enum/index'
import { Employee } from "../../Employee"
import { Department } from "../../Department"
import { IDepartment } from "./IDepartment";
import { DepartmentField } from "./DepartmentField";

/**
  * Auto generated BaseDepartment class
  * It has to extends ASerializable class or implements ISerializable or both in direct or indirect
  */
export abstract class BaseDepartment extends ABaseEntity implements IDepartment {
    
    /** Get Name property value as string */
    get Name(): string { return this.Get("Name"); }
    /** Set Name property value as string */
    set Name(value: string) {  
        if(Utils.isString(value)) {
            this.Set("Name", value); 
        } 
        else {
            throw "invalid input for Department.Name"; 
        }
    }


    private _Employees: Employee[] | any[];
    /** Get Employees property value as array of Employee and it is readonly*/
    get Employees(): Employee[] {
        if (!this._Employees) {
            this._Employees = Array<Employee>();
        }
        return this._Employees;
    }


    private _HigherDepartment: Department | any;
    /** Get HigherDepartmentGUID property value as object whick is key of Department object */
    get HigherDepartmentGUID(): any { return this.Get("HigherDepartmentGUID"); }    
    /** Get HigherDepartmentGUID property value as Department object and it is readonly */
    get HigherDepartment(): Department | any {
        if (this.HigherDepartmentGUID !== null && this.HigherDepartmentGUID !== undefined) { 
            return this._HigherDepartment; 
        }
        else {
            return null;
        }
    }
    /** Set HigherDepartmentGUID property value as Department object and then load HigherDepartment object by calling HigherDepartment.fromJson(json) */
    set HigherDepartmentGUID(value: any) {
        if (this.Set("HigherDepartmentGUID", value)) {
            this._HigherDepartment = new Department({ GUID: value });
        }
    }


    private _SubDepartments: Department[] | any[];
    /** Get SubDepartments property value as array of Department and it is readonly*/
    get SubDepartments(): Department[] {
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
    
    
    /**
     * Get json object from instance of Department class
     * @param depth what should to depth of serialization 
     * @returns json data with minimum level zero 
     */
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
            self.Employees = this.Employees.map((item)=> {
                return item.toJson((depth || 0) - 1);
            });
        }

        if (depth > 0 && this.SubDepartments.length) {
            self.SubDepartments = this.SubDepartments.map((item)=> {
                return item.toJson((depth || 0) - 1);
            });
        }
        return self;
    }


    /**
     * load json object into instance of Department class
     * @param depth What should to depth of deserialization 
     * @param json json data
     */
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
            this.HigherDepartmentGUID = this.Json.HigherDepartment.GUID;
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

    abstract async Save(): Promise<BaseDepartment>;
    abstract async Delete(): Promise<BaseDepartment>;
}