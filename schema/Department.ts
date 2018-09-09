
import { ISerializable, ASerializable, IBaseEntity, ABaseEntity, Utils } from '../src/index';
import {  } from './enum/index'
import { Employee } from "./Employee"
import { IDepartment } from "./base/Department/IDepartment";
import { BaseDepartment } from "./base/Department/BaseDepartment";
import { DepartmentField } from "./base/Department/DepartmentField";

/**
  * Auto generated Department class
  * It has to extends BaseDepartment class or implements ISerializable or both in direct or indirect
  */
export class Department extends BaseDepartment {

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
        /***** YOUR CUSTOM CODE START HERE ********/
    
        /***** YOUR CUSTOM CODE START END ********/
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
        /***** YOUR CUSTOM CODE START HERE ********/
    
        /***** YOUR CUSTOM CODE START END ********/
    }

    
    /** implement asyn save method */
    async Save(): Promise<Department> {
        throw "not implemented";
    }


    /** implement asyn delete method */
    async Delete(): Promise<Department> {
        throw "not implemented";
    }

    /***** YOUR CUSTOM CODE START HERE ********/
    
    /***** YOUR CUSTOM CODE START END ********/
}