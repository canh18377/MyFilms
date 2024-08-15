const jwtActions = require('../../midderware/jwtActions')
class ProfileController{
   async index(req,res){
try {
   const response= await jwtActions.verifyToken(req.headers.authorization)
   const {name}=response
    res.json(name)
} catch (error) {
    console.log(error)
}}
}
module.exports = new ProfileController