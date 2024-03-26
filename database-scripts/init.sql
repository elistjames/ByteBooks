-- Members are users with accounts, which give them more features that non-members would not have.
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins are special accounts that have special privileges for moderate the website.
CREATE TABLE admins (
    admin_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts refer to the basic content that members can upload for others to read.
CREATE TABLE posts (
    post_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- Refers to author
    username VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    content VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes INT,
    dislikes INT,
    n_comments INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Likes are how members express their favour towards a post.
CREATE TABLE likes (
    like_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL, -- Post liked in question
    user_id INT NOT NULL, -- The user who made the like
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id)  REFERENCES users(id) ON DELETE CASCADE
);

-- Dislikes are how members express their dislike towards a post.
CREATE TABLE dislikes (
    like_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL, -- Post liked in question
    user_id INT NOT NULL, -- The user who made the like
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Comments how members can express specific thoughts and opinions on posts.
CREATE TABLE comments (
    comment_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL, -- the post the comment was made on
    user_id INT NOT NULL, -- the user who made the comment
    username VARCHAR(50) NOT NULL,
    content VARCHAR(225),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Reports are instances where a member brings attention to a post for some reason.
CREATE TABLE reports (
    report_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL, -- the post that was reported
    reporter_id INT NOT NULL, -- the user that made the report
    reporter_username VARCHAR(50),
    reason VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE
);