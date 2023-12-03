import { apiUrl } from "./constants"

export interface ApiRequestInit extends RequestInit {
    body?: any
}

export const fetchApi = async (input: RequestInfo | URL, init?: ApiRequestInit | undefined) => {
    const url = `${apiUrl}${input}`

    const res = await fetch(url, {
        ...init,
        headers: {
            ...init?.headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(init?.body)
    })

    if (!res.ok) {
        const json = await res.json()

        throw json
    }

    return res
}