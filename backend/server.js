const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const apiRoutes = require('./routes/apiRoutes');

const app = express();

app.use(cors());

app.use(express.json());

connectDB();

const PORT = process.env.PORT;

app.get("/",(request,response)=>{
    response.json({
        message : "Server is running " + PORT
    })
})

app.use('/', apiRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
