import { useEffect, memo, useState } from "react";
import { message } from "antd";
import clsx from "clsx";
import Styles from "./videoProfile.module.scss";

function VideoUpLoaded({ author }) {
  const [videos, setVideos] = useState([]);
  console.log("author:", author);
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
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {videos.map((video, index) => {
        return (
          <div key={index} className={clsx(Styles.containerVideo)}>
            <video src={video.path} className={clsx(Styles.videoProfile)} />
          </div>
        );
      })}
    </div>
  );
}

export default memo(VideoUpLoaded);
