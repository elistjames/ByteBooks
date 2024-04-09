import {makeRequest} from "./AppController";


const COMMENTS_API_ROUTE = '/comment';

class CommentController {
    constructor() {
        this.COMMENTS_API_ROUTE = COMMENTS_API_ROUTE;
    }

    async getCommentsForPost(post_id){
        try{
            const response = await makeRequest('GET', `${this.COMMENTS_API_ROUTE}/getComments/?post_id=${post_id}`);
            return response;
        }
        catch (error){
            await Promise.reject('Failed to get comments: ' + error.message);
        }
    }

    async createComment(post_id, user_id,  username, content){
        try{
            const response = await makeRequest('POST', this.COMMENTS_API_ROUTE+'/createComment', {
                post_id: post_id,
                user_id: user_id,
                username: username,
                content: content
            });
            console.log(response.id);
            return response.id;
        }
        catch(error){
            await Promise.reject('Failed to create comment: ' + error.message);
        }
    }

    async updateComment(comment_id, content){
        try{
            const response = await makeRequest('PUT', this.COMMENTS_API_ROUTE+'/updateComment', {
                comment_id: comment_id,
                content: content
            });
            return response.message;
        }
        catch(error){
            await Promise.reject('Failed to update comment: ' + error.message);
        }
    }

    async deleteComment(comment_id){

        if(!comment_id){
            await Promise.reject("no id provided");
        }

        try{
            const response = await makeRequest('DELETE', this.COMMENTS_API_ROUTE+'/deleteComment', {
                comment_id: comment_id
            });
            return response.message;
        }
        catch(error){
            throw new Error('Failed to delete comment: ' + error.message);
        }
    }
}

export default new CommentController();