import EmpDataService from "@/lib/EmpDataService";
import { NextApiRequest,NextApiResponse } from "../../../../node_modules/next/types";

const empDataService:EmpDataService=new EmpDataService("./data/emps.json")

const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    let {params,deptId}=req.query;
    try{
        if(req.method=='GET'){
            if(params && params!.length>0){
                let id=params![0];
                let emp=await empDataService.getById(Number(id));
                if(emp){
                    res.status(200).json(emp);
                }else{
                    res.status(404).send('No such Contact found');
                }
            }else if(deptId){
                let emps=await empDataService.getAllByDeptId(Number(deptId));
                res.status(200).json(emps);
            }else{
                let emps=await empDataService.getAll();
                res.status(200).json(emps);
            }
        }else if(req.method==='POST'){
            let emp={...req.body};
            emp=await empDataService.add(emp);
            res.status(201).json(emp);
        }else if(req.method==='PUT'){
            let emp={...req.body};
            emp=await empDataService.replace(emp);
            res.status(202).json(emp);
        }else if(req.method==='DELETE'){
            if(params && params!.length>0){
                let id=params![0];
                await empDataService.deleteById(Number(id));
                res.status(200).send('');
            }else{
                res.status(400).json({'error':'id is required'});
            }
        }else{
            res.status(400).json({'error':'the sent method is not supported'});
        }
    }catch(err){
    console.log(err);
    res.status(500).json({'error':'something went wrong'})

    }
}