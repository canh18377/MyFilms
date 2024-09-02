const jwtActions = require("../../midderware/jwtActions");
const Account = require("../models/Account");
const Profile = require("../models/ProfileUser");
const UserVideos = require("../models/UserVideos");
const Videos = require("../models/UserVideos");
const LikedVideos = require("../models/LikedVideos");
class ProfileController {
  async index(req, res) {
    console.log("req::::", req);
    try {
      const profile = await Profile.findOne({
        author: req.params.author,
      });
      console.log("profile", profile);
      res.json(profile);
    } catch (error) {
      console.log(error);
    }
  }
  async updateProflie(req, res) {
    try {
      //xác thực tài khoản
      const response = await jwtActions.verifyToken(req.headers.authorization);
      console.log("len server:", req.body);
      //tìm tài khoản
      const account = await Account.findOne({ name: response.name });
      const updateData = {};

      // Kiểm tra và thêm profilePhoto nếu req.file tồn tại
      if (req.file) {
        updateData.profilePhoto = {
          path: `http://localhost:8080/uploads/images/${req.file.filename}`,
          filename: req.file.filename,
        };
      }

      // Kiểm tra và thêm name nếu req.body.name tồn tại
      if (req.body.name) {
        updateData.name = req.body.name;
      }

      // Kiểm tra và thêm caption nếu req.body.caption tồn tại
      if (req.body.caption) {
        updateData.caption = req.body.caption;
      }
      //updata profile(id account === author)
      Profile.findOneAndUpdate({ author: account._id }, updateData, {
        new: true,
      }).then((Profile) => {
        console.log("ban update", Profile);
        res.json(Profile);
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getVideo(req, res) {
    try {
      console.log("author:", req.params.author);
      const videos = await Videos.find({
        author: req.params.author,
        deleteAt: null,
      });
      const InfoVideos = videos.map((video) => {
        return {
          path: video.path,
          name: video.nameVideo,
          genres: video.genres,
          limitedAge: video.limitedAge,
          _id: video._id,
        };
      });
      res.json(InfoVideos);
    } catch (error) {
      console.log(error);
    }
  }
  async getLikedVideos(req, res) {
    try {
      console.log("author:", req.params.author);
      const listIdVideo = await LikedVideos.findOne({
        author: req.params.author,
      });
      if (!listIdVideo) {
        res.json({ Notification: "Bạn chưa thích video nào!" });
        return;
      }
      const videos = await UserVideos.find({
        _id: { $in: listIdVideo.likedVideos },
      });
      console.log(videos);
      res.json(videos);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteVideo(req, res) {
    try {
      console.log(req.body);
      const response = await UserVideos.findByIdAndUpdate(req.body.idVideo, {
        deleteAt: Date.now(),
      });
      console.log("Sort delete :", response);
      res.json({ success: `Đã xóa video ${response.nameVideo}` });
    } catch (error) {
      res.json({ error: "Có lỗi xảy ra!" });
      console.log(error);
    }
  }
  async updateVideo(req, res) {
    console.log(req.body);
    try {
      const response = await UserVideos.findByIdAndUpdate(
        req.body.videoInfo.idVideo,
        {
          nameVideo: req.body.videoInfo.nameVideo,
          limitedAge: req.body.videoInfo.limitedAge,
          genres: req.body.videoInfo.genres,
        },
        {
          new: true,
        }
      );
      if (response) {
        res.json({ success: "Thay đổi thành công" });
      } else res.json({ error: "Có lỗi xảy ra , thử lại sau ít phút" });
      console.log("video da update:", response);
    } catch (error) {
      res.json({ error: "Có lỗi xảy ra , thử lại sau ít phút" });
      console.log(error);
    }
  }
}
module.exports = new ProfileController();
