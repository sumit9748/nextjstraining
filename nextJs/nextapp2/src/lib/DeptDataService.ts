import Dept from "@/model/Dept";
import DataService from "./DataService";

export default class DeptDataService extends DataService<Dept>{
    constructor(dataStore:string){
        super(dataStore)
    }
    getId(dept:Dept):number{
        return dept.deptId;
    }
}