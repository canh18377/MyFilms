const jwt = require('jsonwebtoken');
require('dotenv').config()
const secrectkey=process.env.secrectkey
const createJwt=(account)=>{
const token = jwt.sign({name:account.name,password:account.password }, secrectkey,{expiresIn:'1h'});
console.log("token",token)
return token
}
const verifyToken=()=>{

}
module.exports={createJwt,verifyToken}