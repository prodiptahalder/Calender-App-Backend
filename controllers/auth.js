
//bring in models to save users to db
const User = require('../models/user');
//always create the model const with name as same as it saved in db

//bringing on express-validator for checking
const { check , validationResult } = require('express-validator');
//check is not used here it is used in routes here we will use validation result

//Importing OAuth Client for google authentication
const {OAuth2Client} = require('google-auth-library')

//bringing in jsonwebtoken express-jwt tokenize and save in cookie to authenticate user
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


//controlling auth routes in route folder
exports.signup = (req,res)=>{
    console.log(req.body)
    //validationResult binds errors with req
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        //status 422 db error throw (Unprocessable Entity)
        return res.status(422).json({
            error: errors.array(),
            type:"params"
        })
    }

    const user = new User(req.body);
    console.log(req.body)
    user.save((err,user)=>{ //gives back two para, error and user
        if(err){
            return res.status(400).json({
                //passing this json to craft a error mesg in front end
                error: "Not able to save user in DB",
                type:"message"
            });
        }
        res.json({
            name:user.name,
            email:user.email,
            id: user._id
        });
    });
}



exports.signin = (req,res)=>{
    const {email,password} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        //status 422 db error throw (Unprocessable Entity)
        return res.status(422).json({
            error: errors.array(),
            type: "params"
        });
    }

    User.findOne({email},(err,user)=>{
        // check for both the err and also if email doesnt exist then user doesnt exist
        if(err || !user){ 
            return res.status(400).json({
                error:"User email does not exists",
                type:"message"
            });
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password Do not match"
            })
        }

        //create token
        const token = jwt.sign({_id:user._id}, process.env.SECRET);
        //put token in cookie
        res.cookie("token",token,{expire: new Date() + 9999});

        //Send response to frontend
        const {_id,name,email,role} = user;
        return res.json({token,user:{_id,name,email,role}});
    });
}



exports.signout = (req,res)=>{
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    });
};

//Google Signin
exports.googleSignIn = async (req,res)=>{
    console.log("Body",req.body);

    //validationResult binds errors with req
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        //status 422 db error throw (Unprocessable Entity)
        return res.status(422).json({
            error: errors.array()[0].msg,
            type:"message",
        })
    }

    const idToken = req.body.idToken;
    const device = req.body.device;
    const client = new OAuth2Client(process.env.GCP_CLIENT_ID);
    

    const ticket = await client.verifyIdToken({
        idToken:idToken,
        audience: device=="android"? process.env.GCP_ANDROID_CLIENT_ID: process.env.GCP_IOS_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const userEmail = payload['email'];
    
    User.findOne({$and:[{email:userEmail},{googleVerified:true}]},(err,user)=>{
        // check for both the err and also if email doesnt exist then user doesnt exist
        if(err || !user){ 
            return res.status(400).json({
                error:"User email does not exists, Please signup first!",
                type:"message"
            });
        }

        //create token
        const token = jwt.sign({_id:user._id}, process.env.SECRET);
        //put token in cookie
        res.cookie("token",token,{expire: new Date() + 9999});

        //Send response to frontend
        const {_id,name,email,role} = user;
        return res.json({token,user:{_id,name,email,role}});
    });
}

//Google Signup
exports.googleSignUp = async (req,res)=>{
    console.log("Body",req.body);

    //validationResult binds errors with req
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        //status 422 db error throw (Unprocessable Entity)
        return res.status(422).json({
            error: errors.array()[0].msg,
        })
    }

    const idToken = req.body.idToken;
    const device = req.body.device;
    const client = new OAuth2Client(process.env.GCP_CLIENT_ID);
    
    const ticket = await client.verifyIdToken({
        idToken:idToken,
        audience: device=="android"? process.env.GCP_ANDROID_CLIENT_ID: process.env.GCP_IOS_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const userEmail = payload['email'];
    const userName = payload['name'];

    //Finding if the user exists previously
    User.findOne({$and:[{email:userEmail},{googleVerified:true}]},(err,user)=>{
        // check for both the err and also if email doesnt exist then user doesnt exist
        if(user){ 
            return res.status(400).json({
                error:"User email already exists!",
                type:"message"
            });
        }

        //Creating new user

        const authData = {
            email: userEmail,
            name: userName,
            googleVerified:true,
        }
        const newUser = new User(authData);
        newUser.save((err,user)=>{ //gives back two para, error and user
            if(err){
                console.log("Error",err);
                return res.status(400).json({
                    //passing this json to craft a error mesg in front end
                    error: "Not able to save user in DB",
                    type:"message"
                });
            }
            res.json({
                name:user.name,
                email:user.email,
                id: user._id
            });
        });
    })
}

//Protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['RS256']
});


//Custom Middlewares
exports.isAuthenticated = (req,res,next) =>{
    //profile will be set from frontend only when the user is logged in and auth is the bearer authentication
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    // req.profile from frontend  req.auth from isSignedIn and  req.profile._id === req.auth._id ids from frontend and backend matches
   
   if(!checker){
    //false result
    return res.status(403).json({
        error: "ACCESS DENIED"
    })
   }
    next();
}

exports.isAdmin = (req,res,next) =>{
    //Using Roles
    if(req.profile.role === 0) //regular user
    {
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
}