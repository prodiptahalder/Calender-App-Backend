const express = require('express');
const router = express.Router();

//bringing on express-validator for checking
const { check , validationResult } = require('express-validator');

//signout signup coming from controller of auth
const {signup,signin, signout, isSignedIn} = require('../controllers/auth');


//use exp validator in b/w /signup and signup controller using an array
router.post('/signup',
[
    check('name').isLength({min:3}).withMessage('Name Should be atleast 3 characters.'),
    check('email').isEmail().withMessage('Email is Required'),
    check('password').isLength({min:3}).withMessage('Password Should be atleast 3 characters.'),
],
signup);


router.post('/signin',[
    check('email').isEmail().withMessage('Email is Required'),
    check('password').isLength({min:3}).withMessage('Password Should be atleast 3 characters.'),
],signin);



router.get('/signout', signout);

router.get('/test', isSignedIn, (req,res)=>{
    res.json(req.auth);
});

module.exports = router;