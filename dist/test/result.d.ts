import { IBaseEntity, ABaseEntity } from '../dist/src/index';
/**
  * Auto generated Employee class
  * It has to extends ASerializable class or implements ISerializable or both in direct or indirect
  */
export declare class Employee extends ABaseEntity implements IBaseEntity {
    Name: string;
    DOB: Date | any;
    private _Manager;
    ManagerGUID: any;
    readonly Manager: Employee | any;
    private _Department;
    DepartmentGUID: any;
    readonly Department: Department | any;
    private _Clients;
    readonly Clients: Employee[] | any;
    /**
      * Auto generated constructor for Employee class
      * @param by default it take GUID as key property
      */
    constructor({GUID}: any);
    Save(): Promise<Employee>;
    Delete(): Promise<Employee>;
    toJson(depth?: number): any;
    fromJson(json: any, depth?: number): void;
}
/**
  * Auto generated Department class
  * It has to extends ASerializable class or implements ISerializable or both in direct or indirect
  */
export declare class Department extends ABaseEntity implements IBaseEntity {
    Name: string;
    private _Employees;
    readonly Employees: Employee[] | any;
    private _HigherDepartment;
    HigherDepartmentGUID: any;
    readonly HigherDepartment: Department | any;
    private _SubDepartments;
    readonly SubDepartments: Department[] | any;
    /**
      * Auto generated constructor for Department class
      * @param by default it take GUID as key property
      */
    constructor({GUID}: any);
    Save(): Promise<Department>;
    Delete(): Promise<Department>;
    toJson(depth?: number): any;
    fromJson(json: any, depth?: number): void;
}
