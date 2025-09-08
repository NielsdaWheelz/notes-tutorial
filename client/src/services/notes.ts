import axios from "axios"
import type { NewNote } from "../types/types"
const baseUrl = "http://localhost:3001/api/notes"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject: NewNote) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id: string, newObject: NewNote) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = (id: string) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update,
    remove
}