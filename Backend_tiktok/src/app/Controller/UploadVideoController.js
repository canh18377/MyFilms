const Profile = require('../models/ProfileUser')
const UserVideos = require('../models/UserVideos.js')
class UploadVideoController{
 async uploadVideo(req,res){
   try {
    console.log('file:',req.file)
    console.log('name,limint,genres:',req.body)
    console.log('author:',req.body.author)
         //updata profile(id account === author)
              const video =await UserVideos.create({
                  path: `http://localhost:8080/uploads/videos/${req.file.filename}`,
                  filename: req.file.filename,
                  nameVideo: req.body.nameVideo,
                  limitedAge: req.body.limitedAge,
                  genres: req.body.genres,
                  author:req.body.author
              })
              console.log("videos:",video)
             const response = await Profile.findOneAndUpdate(
              {author:req.body.author},
              {
                    $push:{videos:video._id}
              },{new:true}
            )
                  console.log('ban update',response)
                }catch (error) {
                        console.log('errorr:',error)
                        res.json({err:'server bận, thử lại sau'})
                    }
                 
                }
              }
module.exports = new UploadVideoController