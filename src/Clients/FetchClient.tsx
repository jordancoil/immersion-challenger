const Client: FetchClient = {
    async get<T>(url: string): Promise<T> {
        return await fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json() as Promise<T>
            })
    },

    async post(url: string, body: object) {
        return await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export default Client

export interface FetchClient {
    get: Function;
    post: Function;
}