import {makeRequest} from "./AppController";


const AUTH_API_ROUTE = '/auth';

class SignInController{
    constructor() {
        this.AUTH_API_ROUTE = AUTH_API_ROUTE;
    }

async signIn(userData) {
    try {
        const response = await makeRequest('POST', `${this.AUTH_API_ROUTE}/login`, userData);
<<<<<<< 42c221e691598d4d41709fb3e72af30ccdbb1a02
        if (response.error) {
            throw new Error(response.error);
        }
        
=======
>>>>>>> fb738174edff5ece21df76d30cbd02352c2be5a5
        const { token, permission, id } = response;
        return { token, permission, id };
    } catch (error) {
        throw new Error('Failed to sign in: ' + error.message);
    }
    }
}

export default new SignInController();
