/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */

const userFlow = 'B2C_1_susi_google'

const b2cPolicies = {
  names: {
    signUpSignIn: userFlow,
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${process.env.VUE_APP_AAD_TENANT}.b2clogin.com/${process.env.VUE_APP_AAD_TENANT}.onmicrosoft.com/${userFlow}`,
    },
  },
  authorityDomain: `${process.env.VUE_APP_AAD_TENANT}.b2clogin.com`,
}

export { b2cPolicies }
