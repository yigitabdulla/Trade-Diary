const BASE_API_URL = 'localhost:5173/'

export type AppConfig = {
    apiPrefix: string
}

const appConfig: AppConfig = {
    apiPrefix: BASE_API_URL + 'api'
}

export default appConfig