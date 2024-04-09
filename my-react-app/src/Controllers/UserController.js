import { makeRequest } from "./AppController";

const USER_API_ROUTE = '/user';

class UserController {
    constructor() {
        this.USER_API_ROUTE = USER_API_ROUTE;
    }

    async deleteAccount(userId) {
        if(!userId) await Promise.reject('Failed to delete account: id not found');
        try {
            const response = await makeRequest('DELETE', this.USER_API_ROUTE + '/deleteUser', {
                user_id: userId
            });
            return response.message;
        } catch (error) {
            await Promise.reject('Failed to delete account: ' + error.message);
        }
    }
    async getUserPosts(username) {
        if(!username) await Promise.reject('Failed to fetch user posts: username not found');
        try {
            const response = await makeRequest('GET', `${this.USER_API_ROUTE}/posts/${username}`);
            return response;
        } catch (error) {
            await Promise.reject('Failed to fetch user posts: ' + error.message);
        }
    }
    async changePassword(userId, oldPassword, newPassword) {
        if(!userId) return { message: "Error: id not found", success: false };
        if(!oldPassword) return { message: "Error: old password not found", success: false };
        if(!newPassword) return { message: "Error: new password not found", success: false };
        try {
            const response = await makeRequest('PUT', `${this.USER_API_ROUTE}/changePassword`, {
                userId,
                oldPassword,
                newPassword
            });

            return { message: response.message, success: response.success };
        } catch (error) {
            return { message: `Failed to change password: ${error.message}`, success: false };
        }
    }

}


export default new UserController();