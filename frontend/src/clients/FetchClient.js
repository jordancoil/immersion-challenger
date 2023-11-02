const FetchClient = {
    async get(url) {
        return await fetch(url)
            .then(res => {
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
