const express = require('express');
const router = express.Router();

const {createGoal, getGoalById, getGoal, getAllGoals, updateGoal, removeGoal} = require('../controllers/goal');

//defining url/:id id as goalId
router.param('goalId', getGoalById);

//to create goal
router.post("/goal/create",createGoal);

//to check a goal
router.get('/goal/:goalId', getGoal);

//to get all goals
router.get('/goals', getAllGoals);

//update goal
router.put('/goal/update/:goalId', updateGoal);

//delete goal
router.delete('/goal/delete/:goalId', removeGoal)

module.exports = router;