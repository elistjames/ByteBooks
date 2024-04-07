import { makeRequest } from "./AppController";

const USER_API_ROUTE = '/user';

class UserController {
    constructor() {
        this.USER_API_ROUTE = USER_API_ROUTE;
    }

    async deleteAccount(userId) {
        try {
            const response = await makeRequest('DELETE', this.USER_API_ROUTE + '/delete', {
                user_id: userId
            });
            return response.message;
        } catch (error) {
            throw new Error('Failed to delete account: ' + error.message);
        }
    }
}

export default new UserController();