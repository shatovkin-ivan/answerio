import { PublicClientApplication } from '@azure/msal-browser'

const msalConfig = {
    auth: {
        clientId: '4a7aaa88-3656-4014-83fc-49443e42b889',
        authority: 'https://login.microsoftonline.com/04d51bf3-93da-447b-8faf-c48bcaf7efc1',
        redirctURI: 'http://localhost:8080/'
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    }
}

const MSALObj = new PublicClientApplication(msalConfig)

let username = ''
function SignIn() {
    const loginScope = {
        scope: ["User.Read"]
    }
    MSALObj.loginRedirect(loginScope)
}
function SignOut() {
    const logoutRequest = {
        account: MSALObj.getAccountByUsername(username)
    }
    MSALObj.logoutRedirect(logoutRequest)
}
MSALObj.handleRedirectPromise().then((response) => {
    if (response !== null) {
        username = response.account.username
        selectAccount()
        console.log(response);
    }
    
}).catch((error) => console.error(error))

function selectAccount() {
    const accounts = MSALObj.getAllAccounts()
    if (accounts.length === 0) return
    username = accounts[0].username
}

export default {
    SignIn,
    SignOut
}