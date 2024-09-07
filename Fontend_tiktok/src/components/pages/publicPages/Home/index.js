import clsx from "clsx";
import {
  useState,
  useRef,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import ReactPlayer from "react-player";
import { HeartOutlined, CommentOutlined } from "@ant-design/icons";
import { Avatar, message } from "antd";
import { useNavigate } from "react-router-dom";
import Styles from "../videos.module.scss";
import { SharedData } from "../../../Layout/DefaultLayout";
import HandleFollow from "./handleFollwing/HandleFollow";
function Home() {
  const { isLoged, setIsModelOpen } = useContext(SharedData);
  const Navigate = useNavigate();
  const [autoPlay, setAutoPlay] = useState(false);
  const [videoHome, setVideoHome] = useState([]);
  const [listFollow, setListFollow] = useState([]);

  const [likedVideo, setLikedVideo] = useState(() => {
    try {
      const storedLikedVideo = localStorage.getItem("likedVideo");
      return storedLikedVideo ? JSON.parse(storedLikedVideo) : [];
    } catch (error) {
      return [];
    }
  });
  const likeVideoref = useRef(likedVideo);
  const profileInfoLocal = useMemo(() => {
    var profileInfoLocal = JSON.parse(localStorage.getItem("profileInfo"));
    return profileInfoLocal;
  }, []);

  console.log(profileInfoLocal);
  useEffect(() => {
    console.log(profileInfoLocal);
    fetch(`http://localhost:8080`, {
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

  const sendList_likeVideo = (likedVideo, persionalLike) => {
    const url = `http://localhost:8080/likeVideos`;
    const formData = new FormData();
    formData.append("likedVideo", JSON.stringify(likedVideo));
    formData.append("persionalLike", JSON.stringify(persionalLike));
    navigator.sendBeacon(url, formData);
    localStorage.removeItem("likedVideo");
  };
  //gửi dữ liệu sau khi unmount
  useEffect(() => {
    return () =>
      sendList_likeVideo(
        likeVideoref.current,
        profileInfoLocal && profileInfoLocal.author
      );
  }, []);
  //lưu trữ dữ liệu like hiện tại
  useEffect(() => {
    console.log(likedVideo);
    likeVideoref.current = likedVideo;
    localStorage.setItem("likedVideo", JSON.stringify(likedVideo));
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
    [isLoged]
  );
  // Lay list follow
  useEffect(() => {
    try {
      fetch(`http://localhost:8080/listFollow/${profileInfoLocal.author}`, {
        headers: { "Content-type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) {
            message.error("server bận");
          } else
            return res.json().then((data) => {
              console.log(data);
              setListFollow(data ? data : []);
            });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);
  // hiển thị,lưu trữ follow tạm thời
  const changeFollower = (author) => {
    setListFollow((pre) => {
      if (pre.includes(author)) {
        return pre.filter((id) => id !== author);
      } else return [...pre, author];
    });
  };

  if (videoHome.length === 0) {
    return;
  }
  return (
    <div className={clsx(Styles.container)}>
      {videoHome.ArrayVideos.map((video, index) => {
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
                    videoHome.infoOwner.find((profile) => {
                      return profile.author === video.author;
                    }).path
                  }
                />
                <div className={clsx(Styles.follow_followed)}>
                  {profileInfoLocal &&
                    profileInfoLocal.author !== video.author && (
                      <HandleFollow
                        isLoged={isLoged}
                        profileInfoLocal={profileInfoLocal}
                        author={video.author}
                        changeFollower={changeFollower}
                        listFollow={listFollow}
                        setIsModelOpen={setIsModelOpen}
                      />
                    )}
                </div>
              </div>
              <div style={{ height: 55, marginBottom: 60 }}>
                <HeartOutlined
                  onClick={() => handleTym(video._id)}
                  className={clsx(Styles.heartVideo, {
                    [Styles.likedVideo]: likedVideo.includes(video._id),
                  })}
                />
                <p style={{ marginLeft: 6 }}>
                  {likedVideo.includes(video._id)
                    ? video.likes + 1
                    : video.likes}
                </p>
              </div>

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
export default Home;
