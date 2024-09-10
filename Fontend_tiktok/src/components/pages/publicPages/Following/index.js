import clsx from "clsx";
import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import ReactPlayer from "react-player";
import { HeartOutlined, CommentOutlined } from "@ant-design/icons";
import { Avatar, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import Styles from "../videos.module.scss";
import { SharedData } from "../../../Layout/DefaultLayout";
function Following() {
  const { isLoged, setIsModelOpen } = useContext(SharedData);
  const Navigate = useNavigate();
  const [autoPlay, setAutoPlay] = useState(false);
  const [videoFollowing, setVideoFollowing] = useState([]);
  const [likedVideo, setLikedVideo] = useState([]);
  const profileInfoLocal = useMemo(() => {
    var profileInfoLocal = JSON.parse(localStorage.getItem("profileInfo"));
    return profileInfoLocal;
  }, []);

  console.log(profileInfoLocal);
  useEffect(() => {
    console.log(profileInfoLocal);
    let APIUrl = "http://localhost:8080";

    if (isLoged) {
      APIUrl = `http://localhost:8080/following/${profileInfoLocal.author}`;
    }
    fetch(APIUrl, {
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          message.error("server bận!");
        } else return res.json();
      })
      .then((data) => {
        console.log(data);
        setVideoFollowing(data);
      })
      .catch((err) => {
        console.log(err);
        message.error("server bận");
      });
  }, [isLoged]);

  useEffect(() => {
    var likedVideoLocal = localStorage.getItem("likedVideoLocal");
    if (likedVideoLocal) {
      likedVideoLocal = JSON.parse(likedVideoLocal);
    } else {
      likedVideoLocal = [];
    }
    console.log(likedVideoLocal);
    const formData = new FormData();
    formData.append("likedVideo", JSON.stringify(likedVideoLocal));
    formData.append(
      "persionalLike",
      JSON.stringify(isLoged && profileInfoLocal.author)
    );

    const sendList_likeVideo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/likeVideos`, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("network response is fail");
        }
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          localStorage.removeItem("likedVideoLocal");
        }
      } catch (error) {
        console.error("Failed to send like videos:", error);
      }
    };
    sendList_likeVideo();
  }, []);

  useEffect(() => {
    localStorage.setItem("likedVideoLocal", JSON.stringify(likedVideo));
  }, [likedVideo]);
  const handleTym = useCallback(
    (idVideo) => {
      if (!isLoged) {
        setIsModelOpen(true);
        return;
      } else {
        setLikedVideo((prev) => {
          if (prev.includes(idVideo)) {
            return likedVideo.filter((id) => {
              return id !== idVideo;
            });
          } else return [...prev, idVideo];
        });
      }
    },
    [isLoged, likedVideo]
  );

  if (videoFollowing.length === 0) {
    return;
  }
  return (
    <div className={clsx(Styles.container)}>
      {videoFollowing.ArrayVideos.map((video, index) => {
        return (
          <div key={index} className={clsx(Styles.containerVideo)}>
            <div className={clsx(Styles.content)}>
              <ReactPlayer
                playing={autoPlay}
                controls
                width={"100%"}
                height={"100%"}
                url={video.path}
                className={clsx(Styles.video)}
              />
            </div>

            <div className={clsx(Styles.actionItemContainer)}>
              <div style={{ position: "relative" }}>
                <Avatar
                  className={clsx(Styles.avatar)}
                  onClick={() => Navigate(`/profile/${video.author}`)}
                  src={
                    videoFollowing.infoOwner.find((profile) => {
                      return profile.author === video.author;
                    }).path
                  }
                />
              </div>
              <HeartOutlined
                onClick={() => handleTym(video._id)}
                className={clsx(Styles.heartVideo, {
                  [Styles.likedVideo]: likedVideo.includes(video._id),
                })}
              />
              <p className={clsx(Styles.totalOfLike)}>
                {likedVideo.includes(video._id) ? video.likes + 1 : video.likes}
              </p>

              <CommentOutlined
                className={clsx(Styles.commentVideo)}
                onClick={() => Navigate(`/videoComments/${video._id}`)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Following;
