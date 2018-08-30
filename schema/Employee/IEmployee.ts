
/*
import { ISerializable } from './ISerializable';
import { ASerializable } from './ASerializable';
import { IBaseEntity } from './IBaseEntity';
import { ABaseEntity } from './ABaseEntity';
import { Utils } from './Utils'; */



/**
  * Auto generated interface for Employee class
  * It enum contains all fields exclude foreign key list object
  */
interface IEmployee extends ABaseEntity, IBaseEntity {
    Name: string | any;
    DOB: Date | any;
    ManagerGUID: string | any;
    DepartmentGUID: string | any;
}