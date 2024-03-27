const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());


const corsOptions = {
    origin: 'http://localhost:5000/'
    };
app.use (cors(corsOptions));


const PORT = process.env.PORT || 5000;

// route for authentication requests
app.use('/auth', authRoutes);

// route for content post requests

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


// API listening on port 5000
app.listen(PORT, () => {
    console.log("Server listening on PORT:", PORT);
})

