import {makeRequest} from "./AppController";

const LIKE_API_ROUTE = '/like';
const DISLIKE_API_ROUTE = '/dislike';

class LikesController {
    constructor() {
        this.LIKE_API_ROUTE = LIKE_API_ROUTE;
        this.DISLIKE_API_ROUTE = DISLIKE_API_ROUTE;
    }

    async addLike(post_id, likedByUser, dislikedByUser, userId){

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
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            try{
                const response = await makeRequest('POST', `${this.LIKE_API_ROUTE}/createLike`, {
                    post_id: post_id,
                    user_id: userId
                });


            }
            catch(error){
                console.log(error);
            }
        }
    }

    async removeLike(post_id, userId){
        try{
            await makeRequest('DELETE', `${this.LIKE_API_ROUTE}/deleteLike`, {
                post_id: post_id,
                user_id: userId
            });
        }
        catch(error){
            console.log(error);
        }
    }

    async addDislike(post_id, likedByUser, dislikedByUser, userId){
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
                console.log(error);
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
                console.log(error);
            }
        }
    }

    async removeDislike(post_id, userId){
        try{
            await makeRequest('DELETE', `${this.DISLIKE_API_ROUTE}/deleteDislike`, {
                post_id: post_id,
                user_id: userId
            });
        }
        catch(error){
            console.log(error);
        }
    }
}
export default new LikesController();