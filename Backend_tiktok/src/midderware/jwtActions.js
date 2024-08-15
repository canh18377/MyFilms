const jwt = require('jsonwebtoken');
require('dotenv').config()
const secrectkey=process.env.secrectkey
const createJwt=(account)=>{
const token = jwt.sign({name:account.name,password:account.password }, secrectkey,{expiresIn:'1h'});
return token
}
const verifyToken=(token)=>{
   return new Promise((resolve,reject)=>{
    jwt.verify(token, secrectkey, function(err, decoded) {
        if(err)
        {
            reject(err)
        }else{resolve(decoded)}
   })})
}
module.exports={createJwt,verifyToken}