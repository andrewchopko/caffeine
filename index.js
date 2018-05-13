const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');

const app = express();

//DB Setup
mongoose.connect("mongodb://andrewchopko:12345678@ds219130.mlab.com:19130/caffeine-dev");

//App Setup
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());
router(app);


const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log("Server Listen on port: " + PORT);
})