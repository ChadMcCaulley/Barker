const db = require("../models");       // same as "../models/index.js"
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
    try{
        // Finding a user
        let user = await db.User.findOne({
            email: req.body.email
        });
        let {id, username, profileImageUrl, email, messages} = user;
        let isMatch = await user.comparePassword(req.body.password);
        // checking if their password matches what was sent to the server
        // if it all matches then log them in
        if(isMatch){
            let token = jwt.sign({
                id, 
                username,
                profileImageUrl,
                email,
                messages
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id, 
                username,
                profileImageUrl,
                email,
                messages,
                token
            });
        } else{
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
    } catch(err){
        return next({
            status: 400,
            message: "Invalid Email/Password."
        });
    }
};

exports.signup = async function(req, res, next) {
    try{
        // Create a user
        // Create a token (signing a token)
        // process.env.SECRET_KEY
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl, email, messages} = user; // Destructuring for easier code
        let token = jwt.sign({
                id,
                username,
                profileImageUrl, 
                email,
                messages
            }, process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            email,
            messages,
            token
        });
    }catch(err){
        // See what kind of error
        // if it's a certain error respond with username/email already taken
        // otherwise just send back a generic 400

        // If the validation fails
        if(err.code === 11000){ 
            err.message = "Sorry, that username and/or email is taken"
        }
        return next({
            status: 400,
            message: err.message
        });
    }
};