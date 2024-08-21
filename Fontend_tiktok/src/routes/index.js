import { Home, Following, Search } from "../components/pages/publicPages";
import { Profile, Upload } from "../components/pages/privatePages";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/following", component: Following },
  { path: "/search", component: Search },
];
const privateRoutes = [
  { path: "/profile", component: Profile },
  { path: "/upload", component: Upload },
];
export { privateRoutes, publicRoutes };
