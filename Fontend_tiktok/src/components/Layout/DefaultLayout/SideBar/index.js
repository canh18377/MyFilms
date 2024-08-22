import Styles from "./sideBar.module.scss";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SharedData } from "..";
import SideBarChildren from "./components/sideBar/SideBarChildren";
function SideBar() {
  const { isLoged, setIsModelOpen, profileInfo } = useContext(SharedData);
  const navigate = useNavigate();
  const handleNavProfile = () => {
    if (isLoged) {
      navigate(`/profile/${profileInfo.author}`);
    } else setIsModelOpen(true);
  };

  return (
    <div className={clsx(Styles.sideBar)}>
      <SideBarChildren
        img="https://th.bing.com/th?id=OIP.Lu7gAIaRSIHFdyITaZU1swHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
        content="For You"
        handle={() => navigate("/")}
      />
      <SideBarChildren
        img="https://th.bing.com/th?id=OIP.4JeJ-eO-uwdcne5qA71YZgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
        content="Following"
        handle={() => navigate("/following")}
      />
      <SideBarChildren
        img="https://th.bing.com/th/id/OIP.8WO2GDRro_B4Bd74IKbogQHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.5&pid=1.7"
        content="Profile"
        handle={handleNavProfile}
      />
    </div>
  );
}

export default SideBar;
