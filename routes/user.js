const express = require('express');
const router = express.Router();

const {getUserById, getUser, updateUser, getAllUsers, addGoal, addNote} = require('../controllers/user');
const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth');

//defining url/:id id as userid
router.param('userId', getUserById);

//to check user his profile he should be signed in as well as authenticated
router.get('/user/:userId',isSignedIn,isAuthenticated,getUser);

//to get all users
router.get('/users', getAllUsers);

//update user
router.put('/user/update/:userId',isSignedIn,isAuthenticated,updateUser);

//Add user goals
router.put('/user/add/goal/:userId',isSignedIn,isAuthenticated,addGoal);

//Add user notes
router.put('/user/add/note/:userId',isSignedIn,isAuthenticated,addNote);

module.exports = router;