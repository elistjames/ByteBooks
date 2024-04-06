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
            throw new Error('Failed to get comments: ' + error.message);
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
            return response.id;
        }
        catch(error){
            throw new Error('Failed to create comment: ' + error.message);
        }
    }
}

export default new CommentController();