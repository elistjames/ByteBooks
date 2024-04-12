import {makeRequest} from "./AppController";

const REPORTS_API_ROUTE = '/report';


class ReportsController {
    constructor() {
        this.REPORTS_API_ROUTE = REPORTS_API_ROUTE;
    }

    async getAllReports(){
        try {
            const reports = await makeRequest('GET', `${this.REPORTS_API_ROUTE}/reports`);
            return reports;
        }
        catch (error) {
            await Promise.reject('Failed to get reports: ' + error.message);
        }

    }

    async reportPost(post_id, user_id, username){

        if(!post_id) await Promise.reject('Failed to report post: id not found');
        if(!user_id) await Promise.reject('Failed to report post: user id not found');
        if(!username) await Promise.reject('Failed to report post: username not found');

        const report = await makeRequest('GET', `${this.REPORTS_API_ROUTE}/getPostReport/?userId=${user_id}&postId=${post_id}`);
        if(report.length > 0){
            await Promise.reject("You have already reported this post.");
        }
        try{
            const response = await makeRequest('POST', this.REPORTS_API_ROUTE+'/createReport', {
                user_id: user_id,
                reported_id: null,
                post_id: post_id,
                username: username,
            });
            return response.message;
        }
        catch(error){
            await Promise.reject('Failed to report post: ' + error.message);
        }
    }

    async reportUser(reported_user_id, user_id, username){
        if(!reported_user_id) await Promise.reject('Failed to report user: id not found');
        if(!user_id) await Promise.reject('Failed to report user: user id not found');
        if(!username) await Promise.reject('Failed to report user: username not found');

        const report = await makeRequest('GET', `${this.REPORTS_API_ROUTE}/getUserReport/?userId=${user_id}&reportedUserId=${reported_user_id}`);
        if(report.length > 0){
            await Promise.reject("You have already reported this user.");
        }
        try{
            const response = await makeRequest('POST', this.REPORTS_API_ROUTE+'/createReport', {
                user_id: user_id,
                reported_id: reported_user_id,
                post_id: null,
                username: username,
            });
            return response.message;
        }
        catch(error){
            await Promise.reject('Failed to report user: ' + error.message);
        }
    }
}

export default new ReportsController();