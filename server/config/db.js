const mongoose = require("mongoose");
const config = require("./config")

exports.ConnectDB = async () => {
    await mongoose.connect(config.mongoose.url);
    console.log(`db connesso ${mongoose.connection.host}`);
}