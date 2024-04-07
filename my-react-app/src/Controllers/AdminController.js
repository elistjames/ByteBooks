import { makeRequest } from "./AppController";

const ADMIN_API_ROUTE = '/admin';

class AdminController {
    constructor() {
        this.ADMIN_API_ROUTE = ADMIN_API_ROUTE;
    }

    async getAllReportedUsers() {
        try {
            const reports = await makeRequest('GET', `${this.ADMIN_API_ROUTE}/reportedUsers`);
            return reports;
        } catch (error) {
            throw new Error('Failed to get reported users: ' + error.message);
        }
    }

    async getAllReportedPosts() {
        try {
            const reports = await makeRequest('GET', `${this.ADMIN_API_ROUTE}/reportedPosts`);
            return reports;
        } catch (error) {
            throw new Error('Failed to get reported posts: ' + error.message);
        }
    }

    async deleteUser(userId) {
        try {
            const response = await makeRequest('DELETE', `${this.ADMIN_API_ROUTE}/user/${userId}`);
            return response.message;
        } catch (error) {
            throw new Error('Failed to delete user: ' + error.message);
        }
    }

    async deletePost(postId) {
        try {
            const response = await makeRequest('DELETE', `${this.ADMIN_API_ROUTE}/post/${postId}`);
            return response.message;
        } catch (error) {
            throw new Error('Failed to delete post: ' + error.message);
        }
    }
}

export default new AdminController();
