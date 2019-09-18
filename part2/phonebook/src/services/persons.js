import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const listPersons = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const createPerson = (person) => {
    return axios.post(baseUrl, person).then(response => response.data)
}

const updatePerson = (person) => {
    return axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default { createPerson, updatePerson, listPersons, deletePerson }