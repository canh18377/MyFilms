const siteRoute=require("./siteRoute")
const accoutRoute = require('./accountRoute')
const profileRoute = require('./profileRoute')
function router(app){
    app.use('/',siteRoute)
    app.use('/account',accoutRoute)
    app.use('/profile',profileRoute)

}
module.exports =router


