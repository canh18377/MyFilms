const Profile = require("../models/ProfileUser");
class SearchController {
  async searchUsers(req, res) {
    console.log(req.params);
    try {
      const listUsers = await Profile.find({
        name: { $regex: req.params.contentSearch, $options: "i" },
      });
      console.log("danh sach tim duoc:", listUsers);
      res.json({ listUsers: listUsers });
    } catch (error) {
      console.log(error);
    }
  }
  async searchVideos(req, res) {
    console.log(req.params.contentSearch);
    console.log(req.params);

    res.json("");
  }
  async searchTopVideos(req, res) {
    console.log(req.params.contentSearch);
    console.log(req.params);

    res.json("");
  }
}

module.exports = new SearchController();
