'use client'
import {getAllDepts} from "@/lib/DeptApiCalls";
import Dept from "@/model/Dept";
import { Fragment,useEffect,useState } from "react";

const DeptsList=()=>{
    let [depts,setDepts]=useState<Dept[]|null>(null);
    let [isLoading,setIsLoading]=useState<boolean>(true);
    let [errMsg,setErrMsg]=useState<string|null>(null);

    const loadData=()=>{
        getAllDepts().then(res=>{
            setIsLoading(false);
            setDepts(res);
            setErrMsg(null);
        }).catch(err=>{
            setIsLoading(false);
            setErrMsg("Unable to fetch data");
        })
    }
    useEffect(()=>{
        loadData();
    },[])

    return(
        <section>
            {errMsg && (
                <div className="alert alert-danger p-2 fw-bold">
                    {errMsg}
                </div>
            )}
            {isLoading && (
                <div className="alert alert-info p-2 fw-bold">
                   Please wait while refreashing data
                </div>
            )}
            {depts && depts.length===0 &&(
                <div className="alert alert-info p-2 fw-bold">
                    No records found to display
                </div>
            ) }
            {depts && depts.length>0 && (
                <Fragment>
                    <div className="row border-bottom border-dark p-2 fw-bold text-center">
                        <div className="col-2">
                            DeptId
                        </div>
                        <div className="col">
                            Title
                        </div>
                    </div>
                    {depts.map(dept=>(
                        <div className="row border-bottom border-primary p-2">
                            <div className="col-2">
                                {dept.deptId}
                            </div>
                            <div className="col-2">
                                {dept.name}
                            </div>
                        </div>
                    ))}
                </Fragment>
            )}
        </section>
    )
}
export default DeptsList;