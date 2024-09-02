import { SharedData } from "../../../../Layout/DefaultLayout";
import { useContext, useState, useEffect } from "react";
import { message, Progress } from "antd";
import clsx from "clsx";
import Styles from "./searchVideos.module.scss";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
function Searchvideos({ status, setStatus }) {
  const [foundVideos, setFoundVideos] = useState([]);
  const { contentSearch } = useContext(SharedData);
  const Navigate = useNavigate();
  console.log("contentSearch:", contentSearch);
  useEffect(() => {
    fetch(
      `http://localhost:8080/search/videos/${encodeURIComponent(
        contentSearch
      )}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        if (!res.ok) {
          message.error("server bận");
        } else return res.json();
      })
      .then((data) => {
        const { listVideos } = data;
        console.log(listVideos);
        setFoundVideos(listVideos);
        setStatus(false);
      })
      .catch((error) => {
        console.log(error);
        message.error("Có lỗi xảy ra");
      });
  }, [contentSearch]);
  if (status) {
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
    <div className={clsx(Styles.videos)}>
      {foundVideos.map((video, index) => {
        return (
          <div
            onClick={() => Navigate(`/videoComments/${video._id}`)}
            key={index}
            className={clsx(Styles.containerVideo)}
          >
            <ReactPlayer
              height={"80%"}
              width={"95%"}
              url={video.path}
              className={clsx(Styles.video)}
            />
            <div className={clsx(Styles.infoVideo)}>
              <u style={{ fontSize: "small" }}>@{video.nameVideo}</u>
              {
                <div className={clsx(Styles.genre)}>
                  {video.genres.map((genre, index) => {
                    return <p key={index}>{<u>#{genre}</u>}</p>;
                  })}
                </div>
              }
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Searchvideos;
