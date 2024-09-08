import { useEffect, memo, useState, useContext } from "react";
import { message, Progress } from "antd";
import clsx from "clsx";
import Styles from "./videoProfile.module.scss";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { SharedData } from "../../../../Layout/DefaultLayout";
var profileInfoLocal;
function LikedVideos({ author }) {
  const { profileInfo } = useContext(SharedData);
  console.log(author);
  const Navigate = useNavigate();
  const [likedVideos, setLikedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    profileInfoLocal = JSON.parse(localStorage.getItem("profileInfo"));
    fetch(`http://localhost:8080/profile/likedVideos/${author}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          message.error("server bận");
        } else return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.Notification) {
          profileInfoLocal.author === profileInfo.author
            ? message.loading(data.Notification)
            : message.loading("Người này chưa thích video nào!");
          setIsLoading(false);
          return;
        }
        setLikedVideos(data);
        console.log("video:", data);
        setIsLoading(false);
      })
      .catch((err) => {
        message.error("có lỗi xảy ra ");
        console.log(err);
      });
  }, [author]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20%",
        }}
      >
        <Progress type="dashboard" percent={50} showInfo={true} />
        <p style={{ color: "red" }}> loading...</p>
      </div>
    );
  }
  return (
    <div className={clsx(Styles.containerVideos)}>
      {likedVideos.map((video, index) => {
        return (
          <div key={index} className={clsx(Styles.containerVideo_Info)}>
            <ReactPlayer
              className={clsx(Styles.containerVideo)}
              url={video.path}
              width={"100%"}
              height={"100%"}
            />
            <div className={clsx(Styles.videoInfo)}>
              <p style={{ fontSize: "90%" }}>@{video.nameVideo}</p>
              <u style={{ fontSize: "small", disulay: "block" }}>
                Match: {video.limitedAge}
              </u>

              {
                <div className={clsx(Styles.genre)}>
                  {video.genres.map((genre, index) => {
                    return (
                      <i key={index} style={{ fontSize: "10px" }}>
                        #{genre}
                      </i>
                    );
                  })}
                </div>
              }
            </div>{" "}
          </div>
        );
      })}
    </div>
  );
}

export default memo(LikedVideos);
