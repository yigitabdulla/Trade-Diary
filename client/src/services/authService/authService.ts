import apiRequest from "../apiRequest";
import appConfig from "../../configs/app.config";

const login = async (username: string, password: string) => { 
    try {
        return await apiRequest.post(appConfig.loginEndpoint, {
            username,
            password
        });
    } catch (error) {
        console.error(error);
    }
}

const signup = async (username: string,email: string, password: string) => {
    try {
        return await apiRequest.post(appConfig.signupEndpoint, {
            username,
            email,
            password
        });
    } catch (error) {
        console.error(error);
    }
}

const logout = async () => {
    try {
        return await apiRequest.post(appConfig.logoutEndpoint);
    } catch (error) {
        console.error(error);
    }
}

export default {
    login,
    signup,
    logout
}