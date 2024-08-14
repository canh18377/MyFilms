const siteRoute=require("./siteRoute")
const accoutRoute = require('./accountRoute')
function router(app){
    app.use('/',siteRoute)
    app.use('/account',accoutRoute)
}
module.exports =router


