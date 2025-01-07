import Dept from "@/model/Dept";
import {AxiosResponse} from "../../node_modules/axios/index";
import axios from "../../node_modules/axios/index"

const apiUrl="/api/depts";

export const getAllDepts=():Promise<AxiosResponse[]>=>axios.get(apiUrl);
export const getDeptById=(id:number):Promise<AxiosResponse>=>axios.get(`${apiUrl}/${id}`);
export const deleteById=(id:number):Promise<AxiosResponse>=>axios.delete(`${apiUrl}/${id}`);
export const addDept=(dept:Dept):Promise<AxiosResponse>=>axios.post(apiUrl,dept);
export const updateDept=(dept:Dept):Promise<AxiosResponse>=>axios.put(apiUrl,dept);