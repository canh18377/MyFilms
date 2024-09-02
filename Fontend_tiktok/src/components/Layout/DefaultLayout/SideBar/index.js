import Styles from "./sideBar.module.scss";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SharedData } from "..";
import SideBarChildren from "./components/sideBar/SideBarChildren";
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
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
        icon={<HomeOutlined style={{ fontSize: 24 }} />}
        content="For You"
        handle={() => navigate("/")}
      />
      <SideBarChildren
        icon={<TeamOutlined style={{ fontSize: 24 }} />}
        content="Following"
        handle={() => navigate("/following")}
      />
      <SideBarChildren
        icon={<UserOutlined style={{ fontSize: 24 }} />}
        content="Profile"
        handle={handleNavProfile}
      />
      <SideBarChildren
        icon={<CloudUploadOutlined style={{ fontSize: 24 }} />}
        content="Upload"
        handle={() => {
          if (isLoged) {
            navigate("/upload");
          } else setIsModelOpen(true);
        }}
      />
    </div>
  );
}

export default SideBar;
