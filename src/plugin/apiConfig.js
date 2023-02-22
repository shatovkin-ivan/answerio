// The current application coordinates were pre-registered in a B2C tenant.
const apiConfig = {
  b2cScopes: [`https://${process.env.VUE_APP_AAD_TENANT}.onmicrosoft.com/api/all`],
}

export { apiConfig }
