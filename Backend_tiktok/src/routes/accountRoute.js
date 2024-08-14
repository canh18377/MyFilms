const express= require('express')
const router =express.Router()
const AccountController= require("../app/Controller/AccountController")
router.post('/create',AccountController.create)
router.post('/',AccountController.verifyAccount)
module.exports=router