const User = require('../models/user');
const Goal = require('../models/goal');
const Note = require('../models/note');

exports.getUserById = (req,res,next,id)=>{
    User.findById(id)
    .populate({
        path: 'goals',
        model: 'goal'
    })
    .populate({
        path: 'keywords',
        model: 'keyword'
    })
    .populate({
        path: 'notes',
        model: 'note'
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