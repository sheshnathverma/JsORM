
import { ISerializable, ASerializable, IBaseEntity, ABaseEntity, Utils } from './core/index';
import { GenderType } from './enum/index'
import { Department } from "./Department"
import { IEmployee } from "./base/Employee/IEmployee";
import { BaseEmployee } from "./base/Employee/BaseEmployee";
import { EmployeeField } from "./base/Employee/EmployeeField";

/**
  * Auto generated Employee class
  * It has to extends BaseEmployee class or implements ISerializable or both in direct or indirect
  */
export class Employee extends BaseEmployee {

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
        /***** YOUR CUSTOM CODE START HERE ********/
    
        /***** YOUR CUSTOM CODE START END ********/
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
        /***** YOUR CUSTOM CODE START HERE ********/
    
        /***** YOUR CUSTOM CODE START END ********/
    }

    
    /** implement asyn save method */
    async Save(): Promise<Employee> {
        throw "not implemented";
    }


    /** implement asyn delete method */
    async Delete(): Promise<Employee> {
        throw "not implemented";
    }

    /***** YOUR CUSTOM CODE START HERE ********/
    
    /***** YOUR CUSTOM CODE START END ********/
}