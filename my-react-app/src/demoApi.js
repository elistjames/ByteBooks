import postData from "./demoData/posts.json";
// Function to read JSON file

// Function to get a post by ID
export function getPost(id) {
    const posts = postData;
    if (!posts) {
        return { error: 'Failed to retrieve posts.' };
    }

    const p = posts.filter((post)=> post.post_id == id)[0];
    if (!p) {
        return { error: 'Post not found.' };
    }

    return p;
}