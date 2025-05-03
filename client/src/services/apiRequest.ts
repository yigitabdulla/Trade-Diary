import axios from "axios";
import appConfig from "../configs/app.config";

const apiRequest = axios.create({
    baseURL: appConfig.apiPrefix,
    withCredentials: true
})

export default apiRequest