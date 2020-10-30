const express = require('express');
const router = express.Router();

const {createReminder, getReminderById, getReminder, getAllReminders, updateReminder, removeReminder} = require('../controllers/reminder');

//defining url/:id id as reminderId
router.param('reminderId', getReminderById);

//to create reminder
router.post("/reminder/create",createReminder);

//to check a reminder
router.get('/reminder/:reminderId',getReminder);

//to get all reminders
router.get('/reminders', getAllReminders);

//update reminder
router.put('/reminder/update/:reminderId', updateReminder);

//delete reminder
router.delete('/reminder/delete/:reminderId', removeReminder)

module.exports = router;