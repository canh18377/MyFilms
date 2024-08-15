const express= require('express')
const router =express.Router()
const ProfileController= require("../app/Controller/ProfileController")
router.get('/',ProfileController.index)

module.exports=router