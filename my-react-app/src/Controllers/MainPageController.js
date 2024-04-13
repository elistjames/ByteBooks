import {makeRequest} from "./AppController";

const POSTS_API_ROUTE = '/post';

class MainPageController{
    constructor() {
        this.POSTS_API_ROUTE = POSTS_API_ROUTE;
    }

    async getAllPosts(userType, user_id) {

        if(userType !== 'guest' && !user_id) await Promise.reject('Failed to get posts: session data not found');
        try{
            return await makeRequest('GET', `${this.POSTS_API_ROUTE}/posts/?userId=${user_id}`);
        }
        catch(error){
            await Promise.reject('Failed to get posts: ' + error.message);
        }
    }

    async getSearchedPosts(search, userType, user_id) {
        let posts = await this.getAllPosts(userType, user_id);

        if(search !== ""){
            posts = posts.filter(post =>
                (post.title.toLowerCase().includes(search.toLowerCase())) ||
                (post.content.toLowerCase().includes(search.toLowerCase())) ||
                post.username.toLowerCase().includes(search.toLowerCase())
            );

        }
        return posts;
    }

    async getPostById(id, user_id){
        try{
            const response = await makeRequest('GET', `${this.POSTS_API_ROUTE}/getPost/?postId=${id}&userId=${user_id}`);
            return response;
        }
        catch (error){
            await Promise.reject('Failed to get post: ' + error.message);
        }
    }

    async addPost(userId, username, title, content) {
        if(!username) await Promise.reject('Failed to create post: username not found');
        if(!title) await Promise.reject('must have a title');
        if(!content) await Promise.reject('must have content');
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
            await Promise.reject('Failed to create post: ' + error.message);
        }
    }

    async updatePost(postId, title, content){
        if(!postId) await Promise.reject('Failed to update post: id not found');
        if(!title) await Promise.reject('must have a title');
        if(!content) await Promise.reject('must have content');
        try{
            const response = await makeRequest('PUT', this.POSTS_API_ROUTE+'/updatePost', {
                post_id: postId,
                title: title,
                content: content
            });

            return response;
        }
        catch(error){
            await Promise.reject('Failed to update post: ' + error.message);
        }
    }

    async deletePost(postId){
        if(!postId){
            await Promise.reject('Failed to delete post: id not found');
        }
        try{
            const response = await makeRequest('DELETE', this.POSTS_API_ROUTE+'/deletePost', {
                post_id: postId
            });
            return response.message;
        }
        catch(error){
            await Promise.reject('Failed to delete post: ' + error.message);
        }
    }
}
const mainPageControllerInstance = new MainPageController();
export default mainPageControllerInstance;
