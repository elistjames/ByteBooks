import {makeRequest} from "./AppController";


const AUTH_API_ROUTE = '/auth';

class SignInController{
    constructor() {
        this.AUTH_API_ROUTE = AUTH_API_ROUTE;
    }

async signIn(userData) {
    try {
        const response = await makeRequest('POST', `${this.AUTH_API_ROUTE}/login`, userData);
        const { token, permission } = response;
        return { token, permission };
    } catch (error) {
        throw new Error('Failed to sign in: ' + error.message);
    }
}
}

export default new SignInController();
