const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    // THIS WILL GET YOU FIRED IF WE LEAVE IT HERE
    // (we need to store password as a hash)
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    }, 
    resetPasswordToken: String, //For password reset
    resetPasswordExpires: Date,
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

// prior to save, run the following function (async allows us to wait until its finished)
userSchema.pre("save", async function(next){
    try{
        if(!this.isModified("password")){
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);    // 10 is a salt factor that makes decrypting more difficult
        this.password = hashedPassword;
        return next();
    } catch(err){
        return next(err);
    }
})

// Compares another hashed password and the user password
userSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
        let isMatch = await bcrypt.compare(candidatePassword, this.password);   // Compare a hashed password by hashing another password
        return isMatch;
    } catch(err){
        return next(err);
    }
}

const User = mongoose.model("User", userSchema);
module.exports = User;