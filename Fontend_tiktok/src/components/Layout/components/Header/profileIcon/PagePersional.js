import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useContext } from "react";
import { SharedData } from "../../../DefaultLayout";
import Styles from "./pagePersional.module.scss";
import Tippy from "@tippyjs/react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";
function PagePersional() {
  const { setIsLoged, profileInfo } = useContext(SharedData);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("profileInfo");
    setIsLoged(false);
    navigate("/");
  };
  console.log("profileInfo", profileInfo);
  return (
    <div>
      <Tippy
        interactive={true}
        theme="light"
        placement="bottom"
        appendTo="parent"
        delay={[0, 200]}
        content={
          <div className={clsx(Styles.iconBackground)}>
            <div className={clsx(Styles.openProfile)}>
              <UserOutlined style={{ marginRight: 7 }} />
              <p onClick={() => navigate("/profile")}>View Profile</p>
            </div>
            <div className={clsx(Styles.Logut)}>
              <div
                onClick={() => handleLogout()}
                style={{
                  display: "flex",
                  cursor: "pointer",
                  justifyContent: "space-between",
                }}
              >
                <LogoutOutlined style={{ marginRight: 7 }} />
                <p style={{ marginRight: 24 }}>Log Out</p>
              </div>
            </div>
          </div>
        }
      >
        <Avatar src={profileInfo.profilePhoto} size={40} />
      </Tippy>
    </div>
  );
}

export default PagePersional;
