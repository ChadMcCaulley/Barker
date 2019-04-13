const mongoose = require("mongoose");

mongoose.set("debug", true);    // All mongodb requests shown in cmd terminal
mongoose.Promise = Promise;     // We can now use Promises with mongoose (async code)
mongoose.connect("mongodb://localhost/warbler", {
    keepAlive: true,
    useNewUrlParser: true
});

module.exports.User = require("./user"); 
module.exports.Message = require("./message");