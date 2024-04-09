

const BASE_URL = 'http://127.0.0.1:8080';

export async function makeRequest(method, endpoint, body) {
    const requestOptions = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (body) {
        requestOptions.body = JSON.stringify(body);
    }
    try{
        const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
        if(!response.ok){
            throw new Error(`Request failed with status ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        throw new Error(error);
    }

}