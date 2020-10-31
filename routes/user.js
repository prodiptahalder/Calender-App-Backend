const express = require('express');
const router = express.Router();

const {getUserById, getUser, updateUser, getAllUsers, addGoal, addNote, addKeyword, addTask, addReminder, inviteToGoal, inviteToTask, commonGoal, commonTask} = require('../controllers/user');
const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth');

//defining url/:id id as userid
router.param('userId', getUserById);

//to check user his profile he should be signed in as well as authenticated
router.get('/user/:userId',
// isSignedIn,isAuthenticated,
getUser);

//to get all users
router.get('/users', getAllUsers);

//update user
router.put('/user/update/:userId',
// isSignedIn,isAuthenticated,
updateUser);

//Add user goals
router.put('/user/add/goal/:userId',
// isSignedIn,isAuthenticated,
addGoal);

//Add user notes
router.put('/user/add/note/:userId',
// isSignedIn,isAuthenticated,
addNote);

//Add user keywords
router.put('/user/add/keyword/:userId',
// isSignedIn,isAuthenticated,
addKeyword);

//Add user tasks
router.put('/user/add/task/:userId',
// isSignedIn,isAuthenticated,
addTask);

//Add user reminders
router.put('/user/add/reminder/:userId',
// isSignedIn,isAuthenticated,
addReminder);

/*Invite User to Goal
body:
        {
            invite: user emailId of user to invite,
            goal: goalId of goal where to invite
        }
    */
router.put('/user/goal/invite',
// isSignedIn,isAuthenticated,
inviteToGoal);

/*Invite User to Task
body:
        {
            invite: user emailId of user to invite,
            task: taskId of task where to invite
        }
    */
   router.put('/user/task/invite',
//    isSignedIn,isAuthenticated,
   inviteToTask);

/*Check common goals with another User
body:
        {
            name: user name of the user with common goal is to be checked
        }
 */
router.post('/user/common/goals/:userId',
// isSignedIn,isAuthenticated,
commonGoal);

/*Check common tasks with another User
body:
        {
            name: user name of the user with common task is to be checked
        }
 */
router.post('/user/common/tasks/:userId',
// isSignedIn,isAuthenticated,
commonTask);

module.exports = router;