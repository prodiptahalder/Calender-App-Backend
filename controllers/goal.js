const Goal = require('../models/goal');

exports.getGoalById = (req,res,next,id)=>{
    Goal.findById(id).exec((err,goal)=>{ //always db return 2 things err or goal
        if(err || !goal){
            return res.status(400).json({
                error: "No goal was found in DB"
            });
        }

        req.goal = goal; //storing the goal object in a object name goal
        next();
    });
}

exports.createGoal = (req,res) => {
    const goal = new Goal(req.body);
    goal.save((err,goal)=>{ //gives back two param, error and goal
        if(err){
            return res.status(400).json({
                //passing this json to craft a error mesg in front end
                err: "Not able to save goal in DB"
            });
        }
        res.json({
            title: goal.title,
            startDate: goal.startDate,
            endDate: goal.endDate,
            quote: goal.quote,
            background: goal.background,
            priority: goal.priority,
            recurrant: goal.recurrant
        });
    });
}

exports.getGoal = (req,res)=>{
    return res.json(req.goal);
}

exports.getAllGoals = (req,res,next)=>{
    Goal.find().exec((err,goals)=>{
        if(err || !goals)
        {
            return res.status(400).json({
                error: "No goals found."
            })
        }

        res.json(goals);
    })
}

exports.updateGoal = (req,res)=>{
    Goal.findByIdAndUpdate(
        {_id: req.goal._id},
        {$set: req.body}, //updates everything in the body
        {new: true, useFindandModify: false},
        (err,goal)=>{
            if(err || !goal)
            {
                return res.status(400).json({
                    error:"Goal Not authorised to update this goal"
                })
            }
            res.json(goal);
        }
    )
}

exports.removeGoal = (req, res) => {
    const goal = req.goal;
  
    goal.remove((err, goal) => {
      if (err) {
        return res.status(400).json({
          error: 'Failed to delete goal',
        });
      }
      res.json({
        message: goal.title + ' goal deleted',
      });
    });
  };
