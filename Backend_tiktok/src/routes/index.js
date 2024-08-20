const siteRoute=require("./siteRoute")
const accoutRoute = require('./accountRoute')
const profileRoute = require('./profileRoute')
const uploadVideoRoute = require('./uploadVideoRoute')
function router(app){
    app.use('/',siteRoute)
    app.use('/account',accoutRoute)
    app.use('/profile',profileRoute)
    app.use('/uploadVideo',uploadVideoRoute)

}
module.exports =router


