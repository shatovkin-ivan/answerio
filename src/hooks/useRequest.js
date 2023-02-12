const useRequest = async function(url, method, headers, body) {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: body === null ? null : JSON.stringify(body),
        })
        const data = await response.json() 
        return {
            response,
            data
        }
    } catch(e) {
        console.error(e)
    }
}

export {
    useRequest
}

