const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");

const app = express(); // add extra capability
require("dotenv").config(); 

const corsOptions = {
    origin: ["https://soma-food-blog.vercel.app", "http://localhost:3000"], // Ganti dengan URL frontend Anda
    credentials: true, // Mengizinkan pengiriman cookie melalui CORS
};

// api routes // middlewares
app.use(express.json()); 
// app.use(cors()); 
app.use(cors(corsOptions)); 
app.use("/api/users", userRoute);

// root route
app.get("/", (req, res) => {
    res.send("Just about learning to do serverless on vercel.");
});

app.get("/home", (req, res) => {
    res.send("Hey there, Visitor!")
})

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI || 5000;

app.listen(port, (req, res) => {
    console.log(`server running on port: ${port}`);
});

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDB connection establised");

        // Serverless function
        // app.get("/api/users", async (req, res) => {
        //     // Call the getUsers function using the within wrapper
        //     await within(getUsers, res, 7000);
        // });
    
        // // Within function to handle timeouts and errors
        // async function within(fn, res, duration) {
        //     const id = setTimeout(() => res.json({ message: "There was an error with the upstream service!" }), duration);
    
        //     try {
        //         let data = await fn();
        //         clearTimeout(id);
        //         res.json(data);
        //     } catch (e) {
        //         res.status(500).json({ message: e.message });
        //     }
        // }

        // // Function to get users from the database
        // async function getUsers() {
        //     return await db.getUsers();
        // }
    })
    .catch((error) => console.log("MongoDB Connection failed: ", error.message));
