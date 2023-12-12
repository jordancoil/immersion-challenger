import axios from "axios"

// TODO: move to env
const API_HOST = "localhost"
const API_PORT = "4000"


const APIClient = {
    get(path) {
        return axios.get(`http://${API_HOST}:${API_PORT}/api${path}`)
    },

    post(path, body) {
        return axios.post(`http://${API_HOST}:${API_PORT}/api${path}`, body)
    }
}

export default APIClient
