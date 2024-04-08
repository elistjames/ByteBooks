import { makeRequest } from "./AppController";

const USER_API_ROUTE = '/user';

class UserController {
    constructor() {
        this.USER_API_ROUTE = USER_API_ROUTE;
    }

    async deleteAccount(userId) {
        try {
            const response = await makeRequest('DELETE', this.USER_API_ROUTE + '/deleteUser', {
                user_id: userId
            });
            return response.message;
        } catch (error) {
            throw new Error('Failed to delete account: ' + error.message);
        }
    }
    async getUserPosts(username) {
        try {
            const response = await makeRequest('GET', `${this.USER_API_ROUTE}/posts/${username}`);
            return response;
        } catch (error) {
            throw new Error('Failed to fetch user posts: ' + error.message);
        }
    }
}

export default new UserController();