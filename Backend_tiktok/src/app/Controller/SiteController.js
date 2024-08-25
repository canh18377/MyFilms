const UserVideos = require("../models/UserVideos");
const ProfileUse = require("../models/ProfileUser");
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
}
module.exports = new SiteController();
