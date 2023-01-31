/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 * For more details on using MSAL.js with Azure AD B2C, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/working-with-b2c.md 
 */

import { b2cPolicies } from './policies'
import { apiConfig } from './apiConfig'

const msalConfig = {
    auth: {
      // clientId: '4a7aaa88-3656-4014-83fc-49443e42b889',
      // authority: 'https://login.microsoftonline.com/04d51bf3-93da-447b-8faf-c48bcaf7efc1',
      clientId: "2fdd06f3-7b34-49a3-a78b-0cf1dd87878e", // This is the ONLY mandatory field; everything else is optional.
      authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose sign-up/sign-in user-flow as your default.
      knownAuthorities: [b2cPolicies.authorityDomain], // You must identify your tenant's domain as a known authority.
      redirectUri: "http://localhost:8080", // You must register this URI on Azure Portal/App Registration. Defaults to "window.location.href".
    },
    cache: {
      cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
      storeAuthStateInCookie: false, // If you wish to store cache items in cookies as well as browser cache, set this to "true".
    },
    // system: {
    //   loggerOptions: {
    //     loggerCallback: (level, message, containsPii) => {
    //       if (containsPii) {
    //         return;
    //       }
    //       switch (level) {
    //         case msal.LogLevel.Error:
    //           console.error(message);
    //           return;
    //         case msal.LogLevel.Info:
    //           console.info(message);
    //           return;
    //         case msal.LogLevel.Verbose:
    //           console.debug(message);
    //           return;
    //         case msal.LogLevel.Warning:
    //           console.warn(message);
    //           return;
    //       }
    //     }
    //   }
    // }
  };
  
/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
const loginRequest = {
  scopes: ["openid", ...apiConfig.b2cScopes],
};

/**
 * Scopes you add here will be used to request a token from Azure AD B2C to be used for accessing a protected resource.
 * To learn more about how to work with scopes and resources, see: 
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
const tokenRequest = {
  scopes: [...apiConfig.b2cScopes],  // e.g. ["https://fabrikamb2c.onmicrosoft.com/helloapi/demo.read"]
  forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
};

export {
  msalConfig,
  loginRequest,
  tokenRequest
}