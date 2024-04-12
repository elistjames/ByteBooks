import {makeRequest} from "./AppController";

const AUTH_API_ROUTE = '/auth';

class RegisterController{
    constructor() {
        this.AUTH_API_ROUTE = AUTH_API_ROUTE;
    }

    async Register(userData) {
        try {
            const response = await makeRequest('POST', `${this.AUTH_API_ROUTE}/register`, userData);
            const { token, id } = response;
            return { token, id };
        } catch (error) {
            throw new Error('Failed to register: ' + error.message);
        }
    }
    async CheckUserExists(username) {
        try {
            const response = await makeRequest('GET', `${this.AUTH_API_ROUTE}/checkUserExists?username=${username}`);
            const { exists } = response;

            return exists;
        } catch (error) {
            throw new Error('Failed to check if user exists: ' + error.message);
        }
    }
}

const registerControllerInstance = new RegisterController();
export default registerControllerInstance;
