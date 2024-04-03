const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/mainPage');
const commentRoutes = require('./routes/viewPost');
const reportRoutes = require('./routes/report');
const likeRoutes = require('./routes/like');
const dislikeRoutes = require('./routes/dislike');

const app = express();

app.use(express.json());


const corsOptions = {
    origin: 'http://127.0.0.1:8080/'
    };
app.use (cors(corsOptions));


const PORT = process.env.PORT || 8080;

// route for authentication requests
app.use('/auth', authRoutes);

// route for content main page requests
app.use('/posts', postRoutes);
// route for comment requests

// route for report requests

// route for like requests

// route for dislike requests
app.get("/status", (request, response) => {
    const status = {
        "status": "Running"
    };

    response.send(status);
});


// API listening on port 3306
app.listen(PORT, () => {
    console.log("Server listening on PORT:", PORT);
})

