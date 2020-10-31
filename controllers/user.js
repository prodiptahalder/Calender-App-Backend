const User = require('../models/user');
const Goal = require('../models/goal');
const Note = require('../models/note');

exports.getUserById = (req,res,next,id)=>{
    User.findById(id)
    .populate({
        path: 'goals',
        model: 'goal',
        populate: [
            {
            path: 'invite',
            model: 'user'
            },
            {
            path: 'owner',
            model: 'user'
            }
        ]
    })
    .populate({
        path: 'keywords',
        model: 'keyword'
    })
    .populate({
        path: 'notes',
        model: 'note'
    })
    .populate({
        path: 'tasks',
        model: 'task',
        populate: [
            {
                path: 'subtasks',
                model: 'task'
            },
            {
                path: 'notes',
                model: 'note'
            },
            {
                path: 'invite',
                model: 'user'
            },
            {
                path: 'owner',
                model: 'user'
            }
        ]
    })
    .exec((err,user)=>{ //always db return 2 things err or user
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }

        req.profile = user; //storing the user object in a object name profile
        next();
    });
}

exports.getUser = (req,res)=>{
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}

 exports.getAllUsers = (req,res,next)=>{
    User.find().exec((err,users)=>{
        if(err || !users)
        {
            return res.status(400).json({
                error: "No users found."
            })
        }

        res.json(users);
    })
}

exports.updateUser = (req,res)=>{
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body}, //updates everything in the body
        {new: true, useFindandModify: false},
        (err,user)=>{
            if(err || !user)
            {
                return res.status(400).json({
                    error:"User Not authorised to update this user"
                })
            }
            //since we are getting an user here we will update the user not req.profile
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
    )
}

exports.addGoal = (req,res) => {
        var goals = req.profile.goals;
        const goal = new Goal(req.body);
        goal.save((err,goal)=>{ //gives back two param, error and goal
            if(err){
                return res.status(400).json({
                    //passing this json to craft a error mesg in front end
                    err: "Not able to save goal in DB"
                });
            }
            goals.push(goal);
            req.profile.goals = goals;
            User.findByIdAndUpdate(
                {_id: req.profile._id},
                {$set: req.profile}, //updates everything in the body
                {new: true, useFindandModify: false},
                (err,user)=>{
                    if(err || !user)
                    {
                        return res.status(400).json({
                            error:"User Not authorised to update this user"
                        })
                    }
                    //since we are getting an user here we will update the user not req.profile
                    user.salt = undefined;
                    user.encry_password = undefined;
                    res.json(user);
                }
            )
        });
}

exports.addNote = (req,res) => {
    var notes = req.profile.notes;
    const note = new Note(req.body);
    note.save((err,note)=>{ //gives back two param, error and note
        if(err){
            return res.status(400).json({
                //passing this json to craft a error mesg in front end
                err: "Not able to save note in DB"
            });
        }
        notes.push(note);
        req.profile.notes = notes;
        User.findByIdAndUpdate(
            {_id: req.profile._id},
            {$set: req.profile}, //updates everything in the body
            {new: true, useFindandModify: false},
            (err,user)=>{
                if(err || !user)
                {
                    return res.status(400).json({
                        error:"User Not authorised to update this user"
                    })
                }
                //since we are getting an user here we will update the user not req.profile
                user.salt = undefined;
                user.encry_password = undefined;
                res.json(user);
            }
        )
    });
}

exports.addKeyword = (req,res) => {
    var keywords = req.profile.keywords;
    const keyword = new Keyword(req.body);
    keyword.save((err,keyword)=>{ //gives back two param, error and keyword
        if(err){
            return res.status(400).json({
                //passing this json to craft a error mesg in front end
                err: "Not able to save keyword in DB"
            });
        }
        keywords.push(keyword);
        req.profile.keywords = keywords;
        User.findByIdAndUpdate(
            {_id: req.profile._id},
            {$set: req.profile}, //updates everything in the body
            {new: true, useFindandModify: false},
            (err,user)=>{
                if(err || !user)
                {
                    return res.status(400).json({
                        error:"User Not authorised to update this user"
                    })
                }
                //since we are getting an user here we will update the user not req.profile
                user.salt = undefined;
                user.encry_password = undefined;
                res.json(user);
            }
        )
    });
}

exports.addTask = (req,res) => {
    var tasks = req.profile.tasks;
    const task = new Task(req.body);
    task.save((err,task)=>{ //gives back two param, error and task
        if(err){
            return res.status(400).json({
                //passing this json to craft a error mesg in front end
                err: "Not able to save task in DB"
            });
        }
        tasks.push(task);
        req.profile.tasks = tasks;
        User.findByIdAndUpdate(
            {_id: req.profile._id},
            {$set: req.profile}, //updates everything in the body
            {new: true, useFindandModify: false},
            (err,user)=>{
                if(err || !user)
                {
                    return res.status(400).json({
                        error:"User Not authorised to update this user"
                    })
                }
                //since we are getting an user here we will update the user not req.profile
                user.salt = undefined;
                user.encry_password = undefined;
                res.json(user);
            }
        )
    });
}

exports.addReminder = (req,res) => {
    var reminders = req.profile.reminders;
    const reminder = new Reminder(req.body);
    reminder.save((err,reminder)=>{ //gives back two param, error and reminder
        if(err){
            return res.status(400).json({
                //passing this json to craft a error mesg in front end
                err: "Not able to save reminder in DB"
            });
        }
        reminders.push(reminder);
        req.profile.reminders = reminders;
        User.findByIdAndUpdate(
            {_id: req.profile._id},
            {$set: req.profile}, //updates everything in the body
            {new: true, useFindandModify: false},
            (err,user)=>{
                if(err || !user)
                {
                    return res.status(400).json({
                        error:"User Not authorised to update this user"
                    })
                }
                //since we are getting an user here we will update the user not req.profile
                user.salt = undefined;
                user.encry_password = undefined;
                res.json(user);
            }
        )
    });
}

exports.inviteToGoal = (req,res) => {
    /*
    body:
        {
            invite: user emailId of user to invite,
            goal: goalId of goal where to invite
        }
    */
    const email = req.body.invite;
    const _id = req.body.goal;
    User.findOne({email},(err,usertofind)=>{
        // check for both the err and also if email doesnt exist then user doesnt exist
        if(err || !usertofind){ 
            return res.status(400).json({
                err:"User email does not exists"
            });
        }
        var user = usertofind;
        var goals = user.goals;
        Goal.findOne({_id},(err,goal)=>{
            // check for both the err and also if goal doesnt exist then cannot invite
            if(err || !goal){ 
                console.log(err,goal)
                return res.status(400).json({
                    err:`Goal does not exist so cannot invite ${user.name}`
                });
            }
            var goalobj = goal;
            goals.push(goal);
            user.goals = goals;
            User.findByIdAndUpdate(
                {_id: user._id},
                {$set: user}, //updates everything in the user
                {new: true, useFindandModify: false},
                (err,user)=>{
                    if(err || !user)
                    {
                        return res.status(400).json({
                            error:err
                        })
                    }
                    var goalInvite = goalobj.invite;
                    goalInvite.push(user);
                    goalobj.invite = goalInvite;
                    Goal.findByIdAndUpdate(
                        {_id: goal._id},
                        {$set: goalobj}, //updates everything in the goalobj
                        {new: true, useFindandModify: false},
                        (err,goal)=>{
                            if(err || !goal)
                            {
                                return res.status(400).json({
                                    error:err
                                })
                            }
                            Goal.findByIdAndUpdate()
                            user.salt = undefined;
                            user.encry_password = undefined;
                            res.json({user: user,
                            goal: goal});
                        }
                    )
                }
            )
        });
    });
}

exports.inviteToTask = (req,res) => {
    /*
    body:
        {
            invite: user emailId of user to invite,
            task: taskId of task where to invite
        }
    */
    const email = req.body.invite;
    const _id = req.body.task;
    User.findOne({email},(err,usertofind)=>{
        // check for both the err and also if email doesnt exist then user doesnt exist
        if(err || !usertofind){ 
            return res.status(400).json({
                err:"User email does not exists"
            });
        }
        var user = usertofind;
        var tasks = user.tasks;
        Task.findOne({_id},(err,task)=>{
            // check for both the err and also if task doesnt exist then cannot invite
            if(err || !task){ 
                return res.status(400).json({
                    err:`Task does not exist so cannot invite ${user.name}`
                });
            }
            var taskobj = task;
            tasks.push(task);
            user.tasks = tasks;
            User.findByIdAndUpdate(
                {_id: user._id},
                {$set: user}, //updates everything in the user
                {new: true, useFindandModify: false},
                (err,user)=>{
                    if(err || !user)
                    {
                        return res.status(400).json({
                            error:err
                        })
                    }
                    var taskInvite = taskobj.invite;
                    taskInvite.push(user);
                    taskobj.invite = taskInvite;
                    Task.findByIdAndUpdate(
                        {_id: task._id},
                        {$set: taskobj}, //updates everything in the taskobj
                        {new: true, useFindandModify: false},
                        (err,task)=>{
                            if(err || !task)
                            {
                                return res.status(400).json({
                                    error:err
                                })
                            }
                            Task.findByIdAndUpdate()
                            user.salt = undefined;
                            user.encry_password = undefined;
                            res.json({user: user,
                            task: task});
                        }
                    )
                }
            )
        });
    });
}

exports.commonTask = (req, res) => {
    /*
    body:
        {
            name: user name of the user with common task is to be checked
        }
    */
    const PrimaryUser = req.profile;
    const name = req.body.name;
    User.findOne({name},(err,usertofind) =>{
        if(err || !usertofind){ 
            return res.status(400).json({
                err:"User name does not exists"
            });
        }
        const SecondaryUser = usertofind;
        var commonTaskArray = [];
        PrimaryUser.tasks.map((task,i) => {
            task.invite.map((invitee, i) => {
                if(toString(invitee._id) === toString(SecondaryUser._id)){
                    commonTaskArray.push(task);
                }
            })
        })
        res.json({commonTasks: commonTaskArray})
    })
}

exports.commonGoal = (req, res) => {
    /*
    body:
        {
            name: user name of the user with common goal is to be checked
        }
    */
    const PrimaryUser = req.profile;
    const name = req.body.name;
    User.findOne({name},(err,usertofind) =>{
        if(err || !usertofind){ 
            return res.status(400).json({
                err:"User name does not exists"
            });
        }
        const SecondaryUser = usertofind;
        var commonGoalArray = [];
        PrimaryUser.goals.map((goal,i) => {
            goal.invite.map((invitee, i) => {
                if(toString(invitee._id) === toString(SecondaryUser._id)){
                    commonGoalArray.push(goal);
                }
            })
        })
        res.json({commonGoals: commonGoalArray})
    })
}