import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'
const getAll = ()=>{
    const data = axios.get(baseUrl)
    return data
}

const create = (newContact)=>{
    const result = axios.post(baseUrl, newContact)
    return result
}

const update = (id, newContact)=>{
    const result = axios.put(`${baseUrl}/${id}`, newContact)
    return result
}
const deleteContact = (id)=>{
    const result = axios.delete(`${baseUrl}/?id=${id}`)
    return result
}

export default {
    getAll,
    create,
    update,
    deleteContact
}