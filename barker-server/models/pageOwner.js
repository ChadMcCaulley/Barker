const mongoose = require("mongoose");

const pageOwnerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const pageOwnerSchema = mongoose.model("PageOwner", pageOwnerSchema);
module.exports = pageOwnerSchema;