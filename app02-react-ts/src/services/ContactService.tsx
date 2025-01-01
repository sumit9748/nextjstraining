import axios from "axios"
import Contact from "../models/Contact"

const apiUrl: string = "http://localhost:9999/contacts"
export const getAll = () => {
    return axios.get(apiUrl)
}

export const getById = (id: number) => {
    return axios.get(`${apiUrl}/${id}`)
}
export const deleteById = (id: number) => {
    return axios.delete(`${apiUrl}/${id}`)
}

export const add = (contact: Contact) => {

    return axios.post(apiUrl, contact);
}
export const update = (contact: Contact) => {
    return axios.put(`${apiUrl}/${contact.id}`, contact);
}