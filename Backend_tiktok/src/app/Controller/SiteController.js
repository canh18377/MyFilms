const UserVideos = require("../models/UserVideos");
const ProfileUse = require("../models/ProfileUser");
const LikedVideos = require("../models/LikedVideos");
const List_Follow = require("../models/List_Follow");
const { ObjectId } = require("mongodb");

class SiteController {
  async home(req, res) {
    try {
      const ArrayVideos = await UserVideos.aggregate([
        {
          $match: {
            deleteAt: null,
          },
        },
        { $sample: { size: 5 } },
      ]);
      console.log("ArrayVideos:", ArrayVideos);
      //lay id author
      const authors = ArrayVideos.map((video) => video.author);
      //tim owner  of video
      const profileOwner = await ProfileUse.find({ author: { $in: authors } });
      //lay thong tin owner
      const infoOwner = profileOwner.map((owner) => ({
        author: owner.author,
        path: owner.profilePhoto.path,
      }));

      console.log("ifo ownerr:", infoOwner);
      //tra ve video+owner
      res.json({
        infoOwner: infoOwner,
        ArrayVideos: ArrayVideos,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getListFollow(req, res) {
    console.log("get list:", req.params);
    try {
      const followingList = await List_Follow.findOne({
        user: req.params.author,
      });
      console.log("followingList::::", followingList);
      res.json(followingList && followingList.following);
    } catch (error) {
      console.log(error);
    }
  }

  async following(req, res) {
    console.log("get following", req.params);
    try {
      const response = await List_Follow.findOne({
        user: req.params.author,
      });
      console.log(response);
      const listFollow = response.following.map((id) => new ObjectId(id));
      const followingUserVideos = await UserVideos.aggregate([
        {
          $match: {
            deleteAt: null,
            author: { $in: listFollow },
          },
        },
        {
          $sample: {
            size: 5,
          },
        },
      ]);
      console.log("followingUserVideos", followingUserVideos);
      const authors = followingUserVideos.map((video) => video.author);
      //tim owner  of video
      const profileOwner = await ProfileUse.find({ author: { $in: authors } });
      //lay thong tin owner
      const infoOwner = profileOwner.map((owner) => ({
        author: owner.author,
        path: owner.profilePhoto.path,
      }));
      res.json({
        infoOwner: infoOwner,
        ArrayVideos: followingUserVideos,
      });
      console.log("ifo ownerr:", infoOwner);
    } catch (error) {
      console.log(error);
    }
  }
  async likeVideos(req, res) {
    console.log("liked video:", req.body);
    try {
      const response = await UserVideos.updateMany(
        { _id: { $in: JSON.parse(req.body.likedVideo) } },
        { $inc: { likes: 1 } }
      );
      const response2 = await LikedVideos.findOneAndUpdate(
        {
          author: JSON.parse(req.body.persionalLike),
        },
        {
          $addToSet: {
            likedVideos: { $each: JSON.parse(req.body.likedVideo) },
          },
        },
        { new: true }
      );
      console.log("cac video da like", response2);
      if (!response2) {
        await LikedVideos.create({
          author: JSON.parse(req.body.persionalLike),
          likedVideos: JSON.parse(req.body.likedVideo),
        });
      }
      if (response) {
        res.json({ success: "update successfully" });
      } else res.json({ error: "failure update" });
    } catch (error) {
      console.log(error);
    }
  }
  async handleFollow(req, res) {
    console.log("handle follow", req.body);
    try {
      const { isFollow, user, author } = req.body;

      if (isFollow === "isFollow") {
        // Cập nhật danh sách following của user
        const listFollowing = await List_Follow.findOneAndUpdate(
          { user: user },
          { $addToSet: { following: author } },
          { new: true, upsert: true }
        );
        console.log("handle result:", listFollowing);

        // Cập nhật danh sách follower của author
        const listFollower = await List_Follow.findOneAndUpdate(
          { user: author },
          { $addToSet: { follower: user } },
          { new: true, upsert: true }
        );
        return res.json("success");
      }

      if (isFollow === "isUnFollow") {
        // Cập nhật danh sách following của user
        const listUnFollowing = await List_Follow.findOneAndUpdate(
          { user: user },
          { $pull: { following: author } },
          { new: true }
        );
        // Cập nhật danh sách follower của author
        const listUnFollower = await List_Follow.findOneAndUpdate(
          { user: author },
          { $pull: { follower: user } },
          { new: true }
        );
        return res.json("success");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error", error });
    }
  }
}
module.exports = new SiteController();
