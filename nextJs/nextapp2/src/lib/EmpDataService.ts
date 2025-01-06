import DataService from "./DataService";
import Emps from "@/model/Emps";

export default class EmpDataService extends DataService<Emps>{
    constructor(dataStore:string){
        super(dataStore)
    }
    getId(emp:Emps):number{
        return emp.empId;
    }
    getAllByDeptId(deptId:number):Emps[]{
        return this.getAll().filter(e=>e.deptId===deptId);
    }
}