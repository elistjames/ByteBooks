import React, {useState} from 'react';
import Comment from './Comment/Comment';

const Profile = () => {
    const [comments, setComments] = useState([
            {
                "comment_id": 1,
                "post_id": 1,
                "user_id": 1,
                "username": "estjames",
                "content": "Wow, this photo is giving me all the wanderlust feels! ✨ Where was this taken? I need to add it to my travel bucket list ASAP! 🌍💼 #Wanderlust #TravelGoals"
            },
        ]
    );

    const commentForm = {
        "post_id": 1,
        "user_id": 1,
        "username": "estjames",
        "content": ""
    }

    const handleOnSubmit =(com)=>{
        console.log(com);
        if(com != null){
            const insertAt = 1; // Could be any index
            const nextComments = [
                // Items before the insertion point:
                ...comments.slice(0, insertAt),
                // New item:
                com,
                // Items after the insertion point:
                ...comments.slice(insertAt)
            ];
            setComments(nextComments);
        }

        console.log(comments);

    };


    return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome to the Profile page!</p>

        <br />
        <Comment comment={commentForm} onSubmit={handleOnSubmit}/>
        <br/>
        {comments.map((comment) => (
            <Comment comment={comment}/>
        ))}
    </div>

  );
};

export default Profile;
