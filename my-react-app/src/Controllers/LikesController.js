import {makeRequest} from "./AppController";

const LIKE_API_ROUTE = '/like';
const DISLIKE_API_ROUTE = '/dislike';

class LikesController {
    constructor() {
        this.LIKE_API_ROUTE = LIKE_API_ROUTE;
        this.DISLIKE_API_ROUTE = DISLIKE_API_ROUTE;
    }

    async addLike(post_id, likedByUser, dislikedByUser, userId){
        if(!post_id) await Promise.reject('Failed to like post: id not found');
        if(!userId) await Promise.reject('Failed to like post: user id not found');
        if(dislikedByUser){
            try{
                const [response1, response2] = await Promise.all([
                    await makeRequest('POST', `${this.LIKE_API_ROUTE}/createLike`, {
                        post_id: post_id,
                        user_id: userId
                    }),
                    await makeRequest('DELETE', `${this.DISLIKE_API_ROUTE}/deleteDislike`, {
                        post_id: post_id,
                        user_id: userId
                    })
                ]);

                console.log(response1);
                console.log(response2);
            }
            catch(error){
                await Promise.reject('Failed to like post: ' + error.message);
            }
        }
        else{
            try{
                await makeRequest('POST', `${this.LIKE_API_ROUTE}/createLike`, {
                    post_id: post_id,
                    user_id: userId
                });

            }
            catch(error){
                await Promise.reject('Failed to like post: ' + error.message);
            }
        }
    }

    async removeLike(post_id, userId){
        if(!post_id) await Promise.reject('Failed to like post: id not found');
        if(!userId) await Promise.reject('Failed to like post: user id not found');
        try{
            const response = await makeRequest('DELETE', `${this.LIKE_API_ROUTE}/deleteLike`, {
                post_id: post_id,
                user_id: userId
            });

            return response.message;
        }
        catch(error){
            await Promise.reject('Failed to unlike post: ' + error.message);
        }
    }

    async addDislike(post_id, likedByUser, dislikedByUser, userId){
        if(!post_id) await Promise.reject('Failed to like post: id not found');
        if(!userId) await Promise.reject('Failed to like post: user id not found');
        if(likedByUser){
            try{
                const [response1, response2] = await Promise.all([
                    await makeRequest('POST', `${this.DISLIKE_API_ROUTE}/createDislike`, {
                        post_id: post_id,
                        user_id: userId
                    }),
                    await makeRequest('DELETE', `${this.LIKE_API_ROUTE}/deleteLike`, {
                        post_id: post_id,
                        user_id: userId
                    })
                ]);
            }
            catch(error){
                await Promise.reject('Failed to dislike post: ' + error.message);
            }
        }
        else{
            try{
                await makeRequest('POST', `${this.DISLIKE_API_ROUTE}/createDislike`, {
                    post_id: post_id,
                    user_id: userId
                });
            }
            catch(error){
                await Promise.reject('Failed to dislike post: ' + error.message);
            }
        }
    }

    async removeDislike(post_id, userId){
        if(!post_id) await Promise.reject('Failed to like post: id not found');
        if(!userId) await Promise.reject('Failed to like post: user id not found');
        try{
            await makeRequest('DELETE', `${this.DISLIKE_API_ROUTE}/deleteDislike`, {
                post_id: post_id,
                user_id: userId
            });
        }
        catch(error){
            await Promise.reject('Failed to un-dislike post: ' + error.message);
        }
    }
}
export default new LikesController();