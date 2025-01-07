import Emps from "@/model/Emps";
import axios from "../../node_modules/axios/index";
import AxiosResponse from "../../node_modules/axios/index"
const apiUrl="/api/emps";

export const getAllEmps=():Promise<AxiosResponse>=>axios.get(apiUrl);
export const getEmpById=(id:number):Promise<AxiosResponse>=>axios.get(`${apiUrl}/${id}`);
export const deleteById=(id:number):Promise<AxiosResponse>=>axios.delete(`${apiUrl}?deptId=${id}`);
export const addEmp=(dept:Emps):Promise<AxiosResponse>=>axios.post(apiUrl,dept);
export const updateEmp=(dept:Emps):Promise<AxiosResponse>=>axios.put(apiUrl,dept);