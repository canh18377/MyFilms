const mongoose = require("mongoose");
const UserVideos = require("./UserVideos"); // Import UserVideos schema
const Account = require("./Account");
const { Schema } = mongoose;

const Profile = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "Account" },
  name: { type: String, default: "bạn chưa có tên" },
  profilePhoto: {
    filename: { type: String, default: "" },
    path: {
      type: String,
      default:
        "https://th.bing.com/th?id=OIP.a-9CR_bvpqQL9yYQ7glIJwHaJw&w=217&h=286&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    },
  },
  videos: [{ type: Schema.Types.ObjectId, ref: "UserVideos" }],
  caption: { type: String, default: "" },
});
module.exports = mongoose.model("ProfileUser", Profile);
