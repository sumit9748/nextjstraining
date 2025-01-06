import DeptDataService from "@/lib/DeptDataService";
import DeptDataService from "@/lib/DeptDataService";
import { NextApiRequest,NextApiResponse } from "../../../../node_modules/next/types";

const deptDataService:DeptDataService=new DeptDataService("../data/depts.json");

const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
    let {params}=req.query;
    try{
        if(req.method==="GET"){
            if(params && params!.length>0){
                let id=params![0];
                let dept=await deptDataService.getById(Number(id));
                if(dept){
                    res.status(200).json(dept);
                }else{
                    res.status(404).send("no such contact found");
                }
            }else{
                let depts=await deptDataService.getAll();
                res.status(200).json(depts);
            }
        }else if(req.method==="POST"){
            let dept={...req.body};
            dept=await deptDataService.add(dept);
            res.status(201).json(dept);
        }else if(req.method==='PUT'){
            let dept={...req.body};
            dept=await deptDataService.replace(dept);
            res.status(202).json(dept);
        }else if(req.method==='DELETE'){
            if(params && params!.length>0){
                let id=params![0];
                await deptDataService.deleteById(Number(id));
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
