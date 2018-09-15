# JsORM
It will create object structure based on setup file and its mostly helpful when you need to type cast one object into another object types or json data into class object 

### Demo link: https://sheshnathverma.github.io/JsORM/
## Quickstart
 ### Offline    
        1.  Download this lib
        2.  npm install
        3.  Place your schema.json file inside test folder
        4.  npm start
        
   **Note:** It will create schema folder inside project and it will place all class related folders & files.
   
  ### Online
        1. Go to demo link
        2. Paste you json schema text in left side textbox
        3. Copy all generated text of right side textbox
        4. Create typescript file inside your project
        5  Paste text inside that file and save it
        
  ### About Schema
  
  ```typescript
  interface ISchema {
    name: string;
    extends: string;
    fields: IField[];
}

interface IField {
    name: string;
    type: FieldType;
    is_fk: boolean;
    object_name: string;
    object_type: string;
    readonly: boolean;
}

enum FieldType {
    array,
    boolean,
    date,
    integer,
    enum,
    number,
    object,
    string
}
  ```
### Example
Employee and Department schema and relationship

```json
    [
        {
            "name": "Employee",
            "fields": [
                {
                    "name": "Name",
                    "type": "string"
                },
                {
                    "name": "Salary",
                    "type": "integer"
                },
                {
                    "name": "Rating",
                    "type": "number"
                },
                {
                    "name": "DOB",
                    "type": "date"
                },
                {
                    "name": "IsActive",
                    "type": "boolean",
                    "readonly":true
                },
                {
                    "name": "NickNames",
                    "type": "array",
                    "object_type": "string"
                },
                {
                    "name": "OtherInfo",
                    "type": "object"
                },
                {
                    "name": "Gender",
                    "type": "enum",
                    "object_name": "",
                    "object_type": "GenderType"
                },
                {
                    "name": "ManagerGUID",
                    "type": "object",
                    "object_name": "Manager",
                    "object_type": "Employee",
                    "is_fk": true
                },
                {
                    "name": "Clients",
                    "type": "array",
                    "object_type": "Employee",
                    "is_fk": true
                },
                {
                    "name": "DepartmentGUID",
                    "type": "object",
                    "object_name": "PrimaryDepartment",
                    "object_type": "Department",
                    "is_fk": true
                },
                {
                    "name": "Departments",
                    "type": "array",
                    "object_type": "Department",
                    "is_fk": true
                }
            ]
        },
        {
            "name": "Department",
            "fields": [
                {
                    "name": "Name",
                    "type": "string"
                },
                {
                    "name": "Employees",
                    "type": "array",
                    "object_type": "Employee",
                    "is_fk": true
                },
                {
                    "name": "HigherDepartmentGUID",
                    "type": "object",
                    "object_name": "HigherDepartment",
                    "object_type": "Department",
                    "is_fk": true
                },
                {
                    "name": "SubDepartments",
                    "type": "array",
                    "object_type": "Department",
                    "is_fk": true
                }
            ]
        }
    ]
```
### Issue
Please log as bug inside issue tab
