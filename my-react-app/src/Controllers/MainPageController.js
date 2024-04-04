import {makeRequest} from "./AppController";


const POSTS_API_ROUTE = '/post';

class MainPageController{
    constructor() {
        this.POSTS_API_ROUTE = POSTS_API_ROUTE;
    }

    async getAllPosts(user_id) {
        console.log(user_id);
        return await makeRequest('GET', `${this.POSTS_API_ROUTE}/posts/?userId=${user_id}`);
    }

    async getSearchedPosts(search) {
        let posts = await this.getAllPosts();

        if(search !== ""){
            posts = posts.filter(post =>
                (post.title.toLowerCase().includes(search.toLowerCase())) ||
                (post.content.toLowerCase().includes(search.toLowerCase())) ||
                post.username.toLowerCase().includes(search.toLowerCase())
            );
        }
        return posts;
    }

    async addPost(postData) {
        return await makeRequest('POST', this.POSTS_API_ROUTE+'/posts/createPost', postData);
    }
}

export default new MainPageController();
