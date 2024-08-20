const Profile = require('./ProfileUser')
const mongoose =require( 'mongoose')
const { Schema } = mongoose;

const UserVideos = new Schema({
   path: { type: String, required: true },
  filename: { type: String, required: true },
  nameVideo: { type: String },
  limitedAge: { type: String },
  genres: { type: [String], default: []},
  author:{type:Schema.Types.ObjectId,ref:'Profile'}
 
},{timestamps:true})
module.exports = mongoose.model("UserVideos", UserVideos)
