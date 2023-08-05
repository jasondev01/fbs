const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");

const app = express(); // add extra capability
require("dotenv").config(); 



// api routes // middlewares
app.use(express.json()); 
app.use(cors()); 
app.use("/api/users", userRoute);


// root route
app.get("/", (req, res) => {
    res.send("Wrong Port");
});

const corsOptions = {
    origin: "*", // Ganti dengan URL frontend Anda
    credentials: true, // Mengizinkan pengiriman cookie melalui CORS
};

app.use(cors(corsOptions)); 


const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
    console.log(`server running on port: ${port}`);
});

// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB connection establised"))
// .catch((error) => console.log("MongoDB Connection failed: ", error.message))

async function connectToMongoDB() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}
  
  // Function to close the MongoDB connection
async function closeMongoDBConnection() {
    try {
        await mongoose.disconnect();
        console.log("MongoDB connection closed");
    } catch (error) {
        console.error("Error while closing MongoDB connection:", error);
    }
}
  
// API routes
app.use("/api/users", userRoute);
  
// Serverless function handler
const handler = createServer(app);
  
// Invoke MongoDB connection on function start
connectToMongoDB();
  
// Export the serverless function handler
module.exports = async (req, res) => {
    const result = await handler(req, res);
    // Invoke MongoDB connection close after function execution
    closeMongoDBConnection();
    return result;
};
