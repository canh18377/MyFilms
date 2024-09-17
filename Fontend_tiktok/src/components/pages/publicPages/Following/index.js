import clsx from "clsx";
import {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
  useRef,
} from "react";
import ReactPlayer from "react-player";
import {
  HeartFilled,
  CommentOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Avatar, message } from "antd";
import { useNavigate } from "react-router-dom";
import Styles from "../videos.module.scss";
import { SharedData } from "../../../Layout/DefaultLayout";
let timeout;
let timeoutCLick;
const debounce = (callback, delay) => {
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback();
      timeout = null;
    }, delay);
  };
};
function Following() {
  const { isLoged, setIsModelOpen } = useContext(SharedData);
  const Navigate = useNavigate();
  const videoContainerRef = useRef();
  const [videoUrl, setVideoUrl] = useState([]);
  const [currentVideo, setCurrentVideo] = useState("");
  const [videoFollowing, setVideoFollowing] = useState({
    ArrayVideos: [],
    infoOwner: [],
  });
  const [likedVideo, setLikedVideo] = useState([]);
  const profileInfoLocal = useMemo(() => {
    var profileInfoLocal = JSON.parse(localStorage.getItem("profileInfo"));
    return profileInfoLocal;
  }, []);

  useEffect(() => {
    getVideo();
  }, [isLoged]);

  const getVideo = useCallback(() => {
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
        if (data.Notification) {
          message.info(data.Notification);
          return;
        }
        console.log(data);

        setVideoFollowing((prev) => ({
          ...prev,
          infoOwner: [...prev.infoOwner, ...data.infoOwner],
          ArrayVideos: [...prev.ArrayVideos, ...data.ArrayVideos],
        }));
      })
      .catch((err) => {
        console.log(err);
        message.error("server bận");
      });
  }, [isLoged, videoFollowing.ArrayVideos]);
  useEffect(() => {
    videoFollowing.ArrayVideos.forEach((video, index) => {
      videoUrl[index] = video.path;
    });
  }, [videoFollowing.ArrayVideos]);

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

  //check position
  const checkPosition = () => {
    if (videoContainerRef.current) {
      const arrayVideo = Array.from(videoContainerRef.current.children);
      arrayVideo.forEach((child) => {
        const position = child.getBoundingClientRect();
        if (position.top >= 0 && position.bottom <= window.innerHeight) {
          setCurrentVideo(Number.parseInt(child.getAttribute("data-index")));
          if (
            Number.parseInt(child.getAttribute("data-index")) ===
            videoFollowing.ArrayVideos.length - 1
          ) {
            message.loading("Đang tải thêm video,vui lòng đợi");
            getVideo();
          }
        }
      });
    }
  };
  const debounceHandleScroll = debounce(checkPosition, 500);
  useEffect(() => {
    if (videoContainerRef.current) {
      const container = videoContainerRef.current;
      container.addEventListener("scroll", debounceHandleScroll);
      return () => {
        container.removeEventListener("scroll", debounceHandleScroll);
      };
    }
  }, [videoFollowing]);
  //click video
  function handleClickVideo(index, idVideo) {
    if (timeoutCLick) {
      clearTimeout(timeoutCLick);
      handleTym(idVideo);
      timeoutCLick = null;
      return;
    }
    timeoutCLick = setTimeout(() => {
      setCurrentVideo((prev) => {
        if (prev === index) {
          return null;
        } else return index;
      });
      timeoutCLick = null;
    }, 500);
  }

  if (videoFollowing.length === 0) {
    return;
  }
  return (
    <div className={clsx(Styles.container)} ref={videoContainerRef}>
      {videoFollowing.ArrayVideos.map((video, index) => {
        return (
          <div
            key={index}
            data-index={index}
            className={clsx(Styles.containerVideo)}
          >
            <div
              onClick={() => handleClickVideo(index, video._id)}
              className={clsx(Styles.content)}
            >
              <ReactPlayer
                loop={true}
                playing={currentVideo === index}
                width={"100%"}
                height={"100%"}
                url={videoUrl[index]}
                className={clsx(Styles.video)}
              />
              {currentVideo !== index && (
                <div className={clsx(Styles.postponeVideo)}>
                  <PlayCircleOutlined style={{ fontSize: 30 }} />
                </div>
              )}
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
              <HeartFilled
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
