const mongoose = require('mongoose')
function connect(){
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/tiktok');
        console.log("connect successfully")
    } catch (error) {
        console.log("fail connection")
    }
}
module.exports={connect}