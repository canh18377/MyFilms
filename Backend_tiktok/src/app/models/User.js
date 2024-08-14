const mongoose =require( 'mongoose')
const { Schema } = mongoose;

const account = new Schema({
  name:{type:String},
  password:{type:String},
})
module.exports = mongoose.model("User", account)
