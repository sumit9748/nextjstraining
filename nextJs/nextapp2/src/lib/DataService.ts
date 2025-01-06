'use server'

import fs from "fs";
export default abstract class DataService<EntityType>{
    private dataStore:string;
    constructor(dataStore:string){
        this.dataStore=dataStore;
    }
    abstract getId(rec:EntityType):number;

    private readData=():EntityType[]=>{
        return JSON.parse(String(fs.readFileSync(this.dataStore)));
    }
    private saveData=(data:EntityType[]):void=>{
        fs.writeFileSync(this.dataStore,JSON.stringify(data));
    }
    getAll=():EntityType[]=>{
        return this.readData();
    }
    getById=(id:number):EntityType|undefined=>{
        let data=this.readData();
        return data.find(rec=>this.getId(rec)==id);
    }
    add=(rec:EntityType):EntityType=>{
        let data=this.readData();
        data.push(rec);
        this.saveData(data);
        return rec;
    }
    replace=(rec:EntityType):EntityType=>{
        let data=this.readData();
        let index=data.findIndex(r=>this.getId(r)==this.getId(rec));
        if(index>-1){
            data[index]=rec;
            this.saveData(data);
        }else{
            throw "No such record to update";
        }
        return data[index];
    }
    deleteById=(id:number):boolean=>{
        let data=this.readData();
        let newData=data.filter(r=>this.getId(r)!=id);
        this.saveData(newData);
        return true;

    }
}