import Home from "../components/pages/Home"
import Following from "../components/pages/Following"
import Uploat from "../components/pages/upload"
import Profile from "../components/pages/profile"
import OnlyHeader from "../components/Layout/DefaultLayout/onlyheader/DefaultLayout"
const publicRoutes =[
    {path:'/',component:Home},
    {path:'/following',component:Following},
    {path:'/uploat',component:Uploat, layout:OnlyHeader},
    {path:'/profile',component:Profile}


]
const privateRoutes=[

]
export {privateRoutes,publicRoutes}