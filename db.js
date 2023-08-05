const mongoose = require("mongoose");

// schema to save documents
const usersSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
        unique: true
    },
    favorites: {
        type: [String],
        default: [],
    }
}, {
    timestamps: true,
});

const userModel = mongoose.model("Users", usersSchema);

// Function to get all users from the database
async function getUsers() {
    try {
        const users = await userModel.find();
        return users;
    } catch (error) {
        throw new Error("Failed to fetch users from the database");
    }
}
  
module.exports = {
    getUsers,
};