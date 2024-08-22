import { SharedData } from "../../../../Layout/DefaultLayout";
import { useContext, useState, useEffect } from "react";
import { Avatar, message, Progress } from "antd";
import clsx from "clsx";
import Styles from "./searchVideos.module.scss";
import { Navigate, useNavigate } from "react-router-dom";
function Searchvideos({ status, setStatus }) {
  const [foundVideos, setFoundVideos] = useState([]);
  const { contentSearch } = useContext(SharedData);
  const Navigate = useNavigate();
  const handleClickUser = () => {};
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
          <div key={index} className={clsx(Styles.containerVideo)}>
            <video src={video.path} className={clsx(Styles.video)} />
            <p>{video.nameVideo}</p>
            {
              <div style={{ display: "flex" }}>
                {video.genres.map((genre, index) => {
                  return (
                    <p style={{ fontSize: "small" }} key={index}>
                      {genre}
                    </p>
                  );
                })}
              </div>
            }
          </div>
        );
      })}
    </div>
  );
}

export default Searchvideos;
