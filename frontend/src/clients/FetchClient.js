// const API_HOST = "127.0.0.1"
const API_HOST = "localhost"
const API_PORT = "4000"

const FetchClient = {
    async get(path) {
        return await fetch(`http://${API_HOST}:${API_PORT}${path}`)
            .then(async res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    },

    async post(url, body) {
        return await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export default FetchClient
