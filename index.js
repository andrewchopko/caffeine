const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');
require('./services/passport');

const app = express();

//DB Setup

//App Setup
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());
app.use(passport.initialize());

router(app);


const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log("Server Listen on port: " + PORT);
})