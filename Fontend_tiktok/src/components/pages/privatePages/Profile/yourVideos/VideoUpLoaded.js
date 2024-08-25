import { useEffect, memo, useState } from "react";
import { message } from "antd";
import clsx from "clsx";
import Styles from "./videoProfile.module.scss";
import ReactPlayer from "react-player";
function VideoUpLoaded({ author }) {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/profile/videos/${author}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          message.error("server bận");
        } else return res.json();
      })
      .then((data) => {
        setVideos(data);
        console.log("video:", data);
      })
      .catch((err) => {
        message.error("có lỗi xảy ra ");
        console.log(err);
      });
  }, [author]);
  if (!videos) {
    return <p>loading...</p>;
  }
  return (
    <div className={clsx(Styles.containerVideo)}>
      {videos.map((video, index) => {
        return (
          <ReactPlayer
            key={index}
            width={100}
            height={100}
            style={{}}
            url={video.path}
          />
        );
      })}
    </div>
  );
}

export default memo(VideoUpLoaded);
