// src/config/appConfig.ts
const BASE_API_URL = 'http://localhost:5173/'

export type AppConfig = {
    apiPrefix: string
    usersEndpoint: string
    tradesEndpoint: string
    loginEndpoint: string
    signupEndpoint: string
    logoutEndpoint: string
}

const appConfig: AppConfig = {
    apiPrefix: BASE_API_URL + 'api',
    usersEndpoint: '/users',
    loginEndpoint: '/login',
    signupEndpoint: '/signup',
    tradesEndpoint: '/trades',
    logoutEndpoint: '/logout'
}

export default appConfig
