function getHeaders() {
  return {
    'Ocp-Apim-Subscription-Key': `${process.env.VUE_APP_API_KEY}`,
    'Content-Type': 'application/json',
  }
}

function getHeadersWithAuthorization(token) {
  const headers = getHeaders()

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
    return headers
  }

  return headers
}

export { getHeaders, getHeadersWithAuthorization }
