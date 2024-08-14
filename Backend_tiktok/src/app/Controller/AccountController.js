const { response } = require('express')
const jwtActions = require('../../midderware/jwtActions')
const user= require('../models/User')
class account{
    async create(req,res){
    try {
     const available = await user.findOne({name:req.body.name})
        if(available){
            res.json({fail:"tài khoản đã tồn tại"})
        }else{
            await user.create({name:req.body.name,password:req.body.password})
            res.json({success:"tạo thành công tài khoản "})
        }
    } catch (error) {
        console.log(error)
    }}

    async verifyAccount(req,res){
        const {name,password}=req.body
        try {
           const response= await  user.findOne({name:name})
           if(response)
           {
              if(response.password===password)
              {
                const Token = jwtActions.createJwt({name:response.name,password:response.password})
                res.json({message:'đăng nhập thành công',Token:Token})
              }
              else{
                res.json({massage:'sai thông tin đăng nhập'}) }

           }
           else{res.json({message:"sai thông tin đăng nhập"})}
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports= new account


