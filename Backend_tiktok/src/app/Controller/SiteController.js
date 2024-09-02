const UserVideos = require("../models/UserVideos");
const ProfileUse = require("../models/ProfileUser");
const LikedVideos = require("../models/LikedVideos");
class SiteController {
  async index(req, res) {
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
      res.json({ infoOwner: infoOwner, ArrayVideos: ArrayVideos });
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
      console.log(response2);
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
}
module.exports = new SiteController();
