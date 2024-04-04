import {makeRequest} from "./AppController";


const POSTS_API_ROUTE = '/post';

class MainPageController{
    constructor() {
        this.POSTS_API_ROUTE = POSTS_API_ROUTE;
    }

    async getAllPosts() {
        return await makeRequest('GET', this.POSTS_API_ROUTE+'/posts');
    }

    async addPost(postData) {
        return await makeRequest('POST', this.POSTS_API_ROUTE+'/posts/createPost', postData);
    }
}

export default new MainPageController();
