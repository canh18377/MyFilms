import{HomePublic,FollowingPublic} from '../components/pages/publicPages'
import{HomePrivate,FollowingPrivate,Upload,Profile} from '../components/pages/privatePages'

const publicRoutes =[
    {path:'/',component:HomePublic},
    {path:'/following',component:FollowingPublic},
]
const privateRoutes=[
{path:'/yourprofile',component:Profile},
{path:'/yourhome',component:HomePrivate},
{path:'/yourfollowing',component:FollowingPrivate},]
export {privateRoutes,publicRoutes}