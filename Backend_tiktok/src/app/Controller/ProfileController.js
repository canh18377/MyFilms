const jwtActions = require('../../midderware/jwtActions')
const Account= require('../models/Account')
const Profile = require('../models/ProfileUser')
const Videos = require('../models/UserVideos')
class ProfileController{
   async index(req,res){
try {
   const response= await jwtActions.verifyToken(req.headers.authorization)
    try {
      const account = await Account.findOne({name:response.name})
      const IDprofile = await Profile.findOne({author:account._id})
      res.json(IDprofile)
    } catch (error) {
        console.log(error)
    }    
} catch (error) {
    console.log(error)
}}
 async updateProflie(req,res){
   try {
        //xác thực tài khoản
          const response= await jwtActions.verifyToken(req.headers.authorization)
        //tìm tài khoản
         const account = await Account.findOne({name:response.name})
         //updata profile(id account === author)
                 Profile.findOneAndUpdate(
              {author:account._id},
              {profilePhoto:{
                    path: `http://localhost:8080/uploads/images/${req.file.filename}`,
                    filename:req.file.filename },
                     name:req.body.name,
                     caption:req.body.caption},{new:true})
                     .then((Profile)=>{  console.log('ban update',Profile)
                     res.json(Profile)})
                    } 
                    catch (error) {
                   console.log(error)
                  }
                 
                }

    async getVideo(req,res){
      const videos = await Videos.find({author:req.params.author})
          const InfoVideos= videos.map(((video)=>{
            return {path:video.path,
                    name:video.nameVideo,
                    genres:video.genres,
                    limitedAge:video.limitedAge
                  }
          }))
            res.json(InfoVideos)
          }
              }
module.exports = new ProfileController