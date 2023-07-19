const express = require('express');
const app = express();
PORT = 8000;
const cors = require('cors');

const connection = require('./db');

// Middleware
app.use(cors());

app.use(express.json());

//database
connection();

//router connection
app.use(require('./router/auth'));

app.listen(PORT ,()=>{
    console.log(`server is running in http://localhost:${PORT}`)
});
