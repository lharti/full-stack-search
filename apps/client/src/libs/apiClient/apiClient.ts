const createApiClient = (baseURL: string) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    }

    const fetchWithConfig: typeof fetch = async (endpoint, config) => {
        const url = `${baseURL}${endpoint}`

        const response = await fetch(url, {
            ...config,
            headers: {
                ...defaultHeaders,
                ...config?.headers,
            },
        })

        return response
    }

    return {
        //TODO: add the rest of the HTTP methods
        get: (endpoint: string) => fetchWithConfig(endpoint, { method: 'GET' }),
    }
}

export const apiClient = createApiClient(import.meta.env.VITE_API_URL)
