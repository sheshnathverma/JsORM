
import { ISerializable, ASerializable, IBaseEntity, ABaseEntity, Utils } from '../../core/index';
import { GenderType } from '../../enum/index'
/**
  * Auto generated interface for Employee class
  * It enum contains all fields exclude foreign key list object
  */
export interface IEmployee extends ABaseEntity {
    Name: string | any;
    Salary: number | any;
    Rating: number | any;
    DOB: Date | any;
    IsActive: boolean | any;
    NickNames: string[] | any[];
    OtherInfo: object | any;
    Gender: GenderType | any;
    ManagerGUID: object | any;
    DepartmentGUID: object | any;
}