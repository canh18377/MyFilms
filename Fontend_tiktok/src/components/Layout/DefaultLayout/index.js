import Header from "../components/Header";
import SideBar from "./SideBar";
import Styles from "./defaultLayout.module.scss";
import clsx from "clsx";
import { useState, createContext, useEffect, Fragment } from "react";
const SharedData = createContext();
function DefaultLayout({ children }) {
  const [contentSearch, setContentSearch] = useState("");
  const [history, setHistory] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState(() => {
    const saveDataProfile = localStorage.getItem("profileInfo");
    return saveDataProfile
      ? JSON.parse(saveDataProfile)
      : { profilePhoto: "", name: "", caption: "", author: "" };
  });

  useEffect(() => {
    localStorage.setItem("profileInfo", JSON.stringify(profileInfo));
  }, [profileInfo]);
  const [isLoged, setIsLoged] = useState(() => {
    const token = localStorage.getItem("jwtToken");
    return !!token;
  });

  return (
    <SharedData.Provider
      value={{
        contentSearch,
        setContentSearch,
        history,
        setHistory,
        setIsModelOpen,
        isModelOpen,
        isLoged,
        setIsLoged,
        profileInfo,
        setProfileInfo,
      }}
    >
      <div className={clsx(Styles.DefaultLayout)}>
        <div className={clsx(Styles.header)}>
          <Header />
        </div>
        <div className={clsx(Styles.container)}>
          <SideBar />
          <div className={clsx(Styles.content)}>{children}</div>
        </div>
      </div>
    </SharedData.Provider>
  );
}

export default DefaultLayout;
export { SharedData };
