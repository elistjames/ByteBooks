import {makeRequest} from "./AppController";

const REPORTS_API_ROUTE = '/report';


class ReportsController {
    constructor() {
        this.REPORTS_API_ROUTE = REPORTS_API_ROUTE;
    }

    async getAllReports(){
        try {
            const reports = await makeRequest('GET', `${this.REPORTS_API_ROUTE}/reports`);
            console.log(reports);
            return reports;
        }
        catch (error) {
            throw new Error('Failed to get reports: ' + error.message);
        }

    }

    async reportPost(post_id, user_id, username, reason){
        const report = await makeRequest('GET', `${this.REPORTS_API_ROUTE}/getPostReport/?userId=${user_id}&postId=${post_id}`);
        if(report.length > 0){
            throw new Error("You have already reported this post");
        }
        try{
            const response = await makeRequest('POST', this.REPORTS_API_ROUTE+'/createReport', {
                user_id: user_id,
                reported_id: null,
                post_id: post_id,
                username: username,
                reason: reason
            });
            return response.message;
        }
        catch(error){
            throw new Error('Failed to report post: ' + error.message);
        }
    }

    async reportUser(reported_user_id, user_id, username, reason){
        const report = await makeRequest('GET', `${this.REPORTS_API_ROUTE}/getUserReport/?userId=${user_id}&reportedUserId=${reported_user_id}`);
        if(report.length > 0){
            throw new Error("You have already reported this user");
        }
        try{
            const response = await makeRequest('POST', this.REPORTS_API_ROUTE+'/createReport', {
                user_id: user_id,
                reported_id: reported_user_id,
                post_id: null,
                username: username,
                reason: reason
            });
            return response.message;
        }
        catch(error){
            throw new Error('Failed to report user: ' + error.message);
        }
    }
}

export default new ReportsController();