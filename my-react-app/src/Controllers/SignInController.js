import {makeRequest} from "./AppController";


const AUTH_API_ROUTE = '/auth';

class SignInController{
    constructor() {
        this.AUTH_API_ROUTE = AUTH_API_ROUTE;
    }

async signIn(userData) {
    try {
        const response = await makeRequest('POST', `${this.AUTH_API_ROUTE}/login`, userData);
        if (response.error) {
            throw new Error(response.error);
        }
        
        const { token, permission, id } = response;
        return { token, permission, id };
    } catch (error) {
        throw new Error('Failed to sign in: ' + error.message);
    }
    }
}

export default new SignInController();
