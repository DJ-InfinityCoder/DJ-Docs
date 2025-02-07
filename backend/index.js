const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
require('dotenv').config();

const apiRoutes = require('./routes/apiRoutes');
const adminRoutes = require("./routes/adminRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const suggestedTopicRoutes = require("./routes/suggestedTopicRoutes");

const app = express();

app.use(cors(
    { origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"], 
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true 
     }
));

app.use(express.json());
app.use(cookieParser());

connectDB();

const PORT = process.env.PORT;

app.get("/", (request, response) => {
    response.json({
        message: "Server is running " + PORT
    })
})

app.use('/api', apiRoutes);
app.use("/admin", adminRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/suggested-topics", suggestedTopicRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
