const Reminder = require('../models/reminder');

exports.getReminderById = (req,res,next,id)=>{
    Reminder.findById(id).exec((err,reminder)=>{ //always db return 2 things err or reminder
        if(err || !reminder){
            return res.status(400).json({
                error: "No reminder was found in DB"
            });
        }

        req.reminder = reminder; //storing the reminder object in a object name reminder
        next();
    });
}

exports.createReminder = (req,res) => {
    const reminder = new Reminder(req.body);
    reminder.save((err,reminder)=>{ //gives back two param, error and reminder
        if(err){
            return res.status(400).json({
                //passing this json to craft a error mesg in front end
                err: "Not able to save reminder in DB"
            });
        }
        res.json({
            title: reminder.title,
            isGeoBased: reminder.isGeoBased,
            location: reminder.location,
            time: reminder.time,
            frequency: reminder.frequency,
            hasParent: reminder.hasParent,
            isImportant: reminder.isImportant		
        });
    });
}

exports.getReminder = (req,res)=>{
    return res.json(req.reminder);
}

exports.getAllReminders = (req,res,next)=>{
    Reminder.find().exec((err,reminders)=>{
        if(err || !reminders)
        {
            return res.status(400).json({
                error: "No reminders found."
            })
        }

        res.json(reminders);
    })
}

exports.updateReminder = (req,res)=>{
    Reminder.findByIdAndUpdate(
        {_id: req.reminder._id},
        {$set: req.body}, //updates everything in the body
        {new: true, useFindandModify: false},
        (err,reminder)=>{
            if(err || !reminder)
            {
                return res.status(400).json({
                    error:"Reminder Not authorised to update this reminder"
                })
            }
            res.json(reminder);
        }
    )
}

exports.removeReminder = (req, res) => {
    const reminder = req.reminder;
  
    reminder.remove((err, reminder) => {
      if (err) {
        return res.status(400).json({
          error: 'Failed to delete reminder',
        });
      }
      res.json({
        message: reminder.title + ' reminder deleted',
      });
    });
  };