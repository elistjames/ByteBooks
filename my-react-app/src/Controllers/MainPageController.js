import {makeRequest} from "./AppController";


const POSTS_API_ROUTE = '/post';

class MainPageController{
    constructor() {
        this.POSTS_API_ROUTE = POSTS_API_ROUTE;
    }

    async getAllPosts(user_id) {
        try{
            const response = await makeRequest('GET', `${this.POSTS_API_ROUTE}/posts/?userId=${user_id}`);
            return response;
        }
        catch(error){
            throw new Error('Failed to get posts:' + error.message);
        }
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

    async getPostById(id){
        try{
            const response = await makeRequest('GET', `${this.POSTS_API_ROUTE}/getPost/?postId=${id}`);
            return await response.json();
        }
        catch (error){
            throw new Error('Failed to get post: ' + error.message);
        }
    }

    async addPost(userId, username, title, content) {
        try{
            const response = await makeRequest('POST', this.POSTS_API_ROUTE+'/createPost', {
                user_id: userId,
                username: username,
                title: title,
                content: content
            });
            return response;
        }
        catch(error){
            throw new Error('Failed to create post: ' + error.message);
        }
    }

    async updatePost(postId, title, content){
        try{
            const response = await makeRequest('PUT', this.POSTS_API_ROUTE+'/updatePost', {
                post_id: postId,
                title: title,
                content: content
            });
            return response;
        }
        catch(error){
            throw new Error('Failed to create post: ' + error.message);
        }
    }

    async deletePost(postId){
        try{
            const response = await makeRequest('DELETE', this.POSTS_API_ROUTE+'/deletePost', {
                post_id: postId
            });
            return response;
        }
        catch(error){
            throw new Error('Failed to delete post: ' + error.message);
        }
    }
}

export default new MainPageController();
