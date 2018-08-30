
/*
import { ISerializable } from './ISerializable';
import { ASerializable } from './ASerializable';
import { IBaseEntity } from './IBaseEntity';
import { ABaseEntity } from './ABaseEntity';
import { Utils } from './Utils'; */



/**
import { IDepartment } from "./IDepartment";*/

/**
  * Auto generated BaseDepartment class
  * It has to extends ASerializable class or implements ISerializable or both in direct or indirect
  */
export class BaseDepartment extends ABaseEntity implements IDepartment, IBaseEntity {
    
    get Name(): string { return this.Get("Name"); }
    set Name(value: string) {  
        if(Utils.isString(value)) {
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


    get HigherDepartmentGUID(): string { return this.Get("HigherDepartmentGUID"); }
    set HigherDepartmentGUID(value: string) {  
        if(Utils.isString(value)) {
            this.Set("HigherDepartmentGUID", value); 
        } 
        else {
            throw "invalid input for Department.HigherDepartmentGUID"; 
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
            self.Employees = this.Employees.map((item: ISerializable)=> {
                return item.toJson((depth || 0) - 1);
            });
        }

        if (depth > 0 && this.SubDepartments.length) {
            self.SubDepartments = this.SubDepartments.map((item: ISerializable)=> {
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