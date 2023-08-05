const express = require("express");
const { 
    registerUser, 
    loginUser, 
    findUser, 
    getUsers, 
    addFavoriteRecipe, 
    removeFavoriteRecipe 
} = require("../Controller/userController")

// mini app or router
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);
router.post("/add-favorite", addFavoriteRecipe); 
router.post("/remove-favorite", removeFavoriteRecipe); 

module.exports = router;