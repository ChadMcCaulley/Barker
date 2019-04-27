require('dotenv').config;
const db = require("../models");       // same as "../models/index.js"
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.forgotPassword = async function(req, res, next){
    try{
        let user = await db.User.findOne({
            email: req.body.email
        });
        let {email} = user;
        if(email == "")
            return res.status(400).json("Email required");
        if(user == null)
            return res.status(400).json("That email is not in the database")
        const token = crypto.randomBytes(20).toString('hex');
        user.update({
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 360000
        });
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${process.env.EMAIL_ADDRESS}`,
                pass: `${process.env.EMAIL_PASSWORD}`
            }
        })
        const mailOptions = {
            to:     user.email,
            from:   "barkersite00@gmail.com",
            subject:"Password Reset Request",
            text:   'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        transport.sendMail(mailOptions, (err) => {
            if(err) 
                return res.status(400).json("Email could not be sent")
            else {
                return res.status(200).json({
                    message: "Recovery email sent",
                    token: token
                });
            }
        });
        
    }
    catch(err){
        return next({
            status: 400,
            message: "Could not reset password"
        });
    }
}
exports.reset = async function(req, res, next){

}
exports.signin = async function(req, res, next) {
    try{
        // Finding a user
        let user = await db.User.findOne({
            email: req.body.email
        });
        let {id, username, profileImageUrl, email, messages, followers} = user;
        let isMatch = await user.comparePassword(req.body.password);
        // checking if their password matches what was sent to the server
        // if it all matches then log them in
        if(isMatch){
            let token = jwt.sign({
                id, 
                username,
                profileImageUrl,
                email,
                messages,
                followers
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id, 
                username,
                profileImageUrl,
                email,
                messages,
                followers,
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
        let {id, username, profileImageUrl, email, messages, followers} = user; // Destructuring for easier code
        let token = jwt.sign({
                id,
                username,
                profileImageUrl, 
                email,
                messages, 
                followers
            }, process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            email,
            messages,
            followers,
            token
        });
    }catch(err){
        // See what kind of error
        // if it's a certain error respond with username/email already taken
        // otherwise just send back a generic 400

        // If the validation fails
        if(err.code === 11000)
            err.message = "Sorry, that username and/or email is taken"
        else if(err.message == "User validation failed: password: Path `password` is required., email: Path `email` is required., username: Path `username` is required.")
            err.message = "Email, Password, and Username are required";
        else if(err.message == "User validation failed: password: Path `password` is required., email: Path `email` is required.")
            err.message = "Password and Email are required";
        else if(err.message == "User validation failed: password: Path `password` is required., username: Path `username` is required.")
            err.message = "Password and Username are required";
        else if(err.message == "User validation failed: email: Path `email` is required., username: Path `username` is required.")
            err.message = "Username and Email are required"
        else if(err.message == "User validation failed: password: Path `password` is required.")
            err.message = "Password is required";
        else if(err.message == "User validation failed: username: Path `username` is required.")
            err.message = "Username is required";
        else if(err.message == "User validation failed: email: Path `email` is required.")
            err.message = "Email is required";
        return next({
            status: 400,
            message: err.message
        });
    }
};