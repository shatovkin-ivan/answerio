const useRequest = async function(url, method, headers, body) {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: body === null ? null : JSON.stringify(body),
        })
        if (response.ok) {
            const data = await response.json() 
            return {
                response,
                data
            }
        } else {
            return {
                response
            }
        }
    } catch(e) {
        console.error(e)
    }
}

export {
    useRequest
}

