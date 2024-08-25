import clsx from "clsx";
import "video-react/dist/video-react.css";
import { useState, useContext, useEffect } from "react";
import ReactPlayer from "react-player";
import { HeartOutlined } from "@ant-design/icons";
import { Avatar, message } from "antd";
import { useNavigate } from "react-router-dom";
import Styles from "../videos.module.scss";
import CommentVideo from "../commentVideo";
function Home() {
  const Navigate = useNavigate();
  const [autoPlay, setAutoPlay] = useState(false);
  const [videoHome, setVideoHome] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080", {
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          message.error("server bận!");
        } else return res.json();
      })
      .then((data) => {
        console.log(data);
        setVideoHome(data);
      })
      .catch((err) => {
        console.log(err);
        message.error("server bận");
      });
  }, []);
  if (videoHome.length === 0) {
    return;
  }
  return (
    <div className={clsx(Styles.container)}>
      {videoHome.ArrayVideos.map((video, index) => {
        return (
          <div key={index} style={{ display: "flex" }}>
            <div className={clsx(Styles.content)}>
              <ReactPlayer
                playing={autoPlay}
                controls
                width={"100%"}
                height={"100%"}
                style={{ borderRadius: 120 }}
                url={video.path}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                marginLeft: "10px",
              }}
            >
              <Avatar
                style={{ cursor: "pointer" }}
                onClick={() => Navigate(`/profile/${video.author}`)}
                src={
                  videoHome.infoOwner.find((profile) => {
                    return profile.author === video.author;
                  }).path
                }
              />
              <HeartOutlined />
              <CommentVideo idVideo={video._id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Home;
