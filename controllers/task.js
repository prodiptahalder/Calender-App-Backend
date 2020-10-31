const Task = require('../models/task');

exports.getTaskById = (req,res,next,id)=>{
    Task.findById(id)
    .populate(
        {
        path: 'notes',
        model: 'note'
        }
    )
    .populate(
        {
        path: 'subtasks',
        model: 'task'
        }
    )
    .populate(
        {
            path: 'invite',
            model: 'user'
        }
    )
    .populate(
        {
            path: 'owner',
            model: 'user'
        }
    )
    .exec((err,task)=>{ //always db return 2 things err or task
        if(err || !task){
            return res.status(400).json({
                error: "No task was found in DB"
            });
        }

        req.task = task; //storing the task object in a object name task
        next();
    });
}

exports.createTask = (req,res) => {
    const task = new Task(req.body);
    task.save((err,task)=>{ //gives back two param, error and task
        if(err){
            return res.status(400).json({
                //passing this json to craft a error mesg in front end
                err: "Not able to save task in DB"
            });
        }
        res.json({
            title: task.title,
            location: task.location,
            dateTime: task.dateTime,
            type: task.type,
            priority: task.priority,
            status: task.status,
            subtasks: task.subtasks,
            notes: task.notes,
            isImportant: task.isImportant,
            recurrant: task.recurrant,
            recurrantPeriod: goal.recurrantPeriod
        });
    });
}

exports.getTask = (req,res)=>{
    return res.json(req.task);
}

exports.getAllTasks = (req,res,next)=>{
    Task.find().exec((err,tasks)=>{
        if(err || !tasks)
        {
            return res.status(400).json({
                error: "No tasks found."
            })
        }

        res.json(tasks);
    })
}

exports.updateTask = (req,res)=>{
    Task.findByIdAndUpdate(
        {_id: req.task._id},
        {$set: req.body}, //updates everything in the body
        {new: true, useFindandModify: false},
        (err,task)=>{
            if(err || !task)
            {
                return res.status(400).json({
                    error:"Task Not authorised to update this task"
                })
            }
            res.json(task);
        }
    )
}

exports.removeTask = (req, res) => {
    const task = req.task;
  
    task.remove((err, task) => {
      if (err) {
        return res.status(400).json({
          error: 'Failed to delete task',
        });
      }
      res.json({
        message: task.title + ' task deleted',
      });
    });
  };

exports.addNote = (req,res) => {
    var notes = req.task.notes;
    const note = new Note(req.body);
    note.save((err,note)=>{ //gives back two param, error and note
        if(err){
            return res.status(400).json({
                //passing this json to craft a error mesg in front end
                err: "Not able to save note in DB"
            });
        }
        notes.push(note);
        req.task.notes = notes;
        User.findByIdAndUpdate(
            {_id: req.task._id},
            {$set: req.task}, //updates everything in the body
            {new: true, useFindandModify: false},
            (err,task)=>{
                if(err || !task)
                {
                    return res.status(400).json({
                        error:"User Not authorised to update this task"
                    })
                }
                res.json(task);
            }
        )
    });
}

exports.addSubtask = (req,res) => {
    var subtasks = req.task.subtasks;
    const subtask = new Subtask(req.body);
    subtask.save((err,subtask)=>{ //gives back two param, error and subtask
        if(err){
            return res.status(400).json({
                //passing this json to craft a error mesg in front end
                err: "Not able to save subtask in DB"
            });
        }
        subtasks.push(subtask);
        req.task.subtasks = subtasks;
        User.findByIdAndUpdate(
            {_id: req.task._id},
            {$set: req.task}, //updates everything in the body
            {new: true, useFindandModify: false},
            (err,task)=>{
                if(err || !task)
                {
                    return res.status(400).json({
                        error:"User Not authorised to update this task"
                    })
                }
                res.json(task);
            }
        )
    });
}
