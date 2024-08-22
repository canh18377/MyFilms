import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import Styles from "./upload.module.scss";
import { Checkbox, message, Radio } from "antd";
import { SharedData } from "../../../Layout/DefaultLayout";
const UploadVideo = () => {
  const [infoVideoUpload, setInforVideoUpload] = useState({
    fileVideo: "",
    nameVideo: "",
    limitedAge: "0-9",
  });
  const [genres, setGenre] = useState(["video"]);
  const [previewVideo, setPreviewVideo] = useState("");
  const { profileInfo } = useContext(SharedData);
  const handleUpload = () => {
    const form = new FormData();
    form.append("fileVideo", infoVideoUpload.fileVideo);
    form.append("nameVideo", infoVideoUpload.nameVideo);
    form.append("genres", genres);
    form.append("limitedAge", infoVideoUpload.limitedAge);
    fetch(`http://localhost:8080/uploadVideo/${profileInfo.author}`, {
      method: "POST",
      body: form,
    })
      .then((res) => {
        if (!res.ok) {
          message.error("server bận");
        } else return res.json();
      })
      .then((data) => {
        if (data.err) {
          message.error(data.err);
        } else message.success("tải lên thành công");
      });
    console.log(profileInfo.author);
  };
  useEffect(() => URL.revokeObjectURL(previewVideo), [previewVideo]);

  const handleChecked = (e) => {
    setGenre((pre) => {
      if (genres.includes(e.target.value)) {
        return pre.filter((category) => category !== e.target.value);
      } else return [...pre, e.target.value];
    });
  };

  function convertVideo(e) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const link = URL.createObjectURL(file);
      setInforVideoUpload({ ...infoVideoUpload, fileVideo: file });
      setPreviewVideo(link);
      e.target.value = "";
    } else {
      console.log("no file");
    }
  }
  const Category = [
    "video",
    "Video âm nhạc",
    "Phim ngắn",
    "Phim tài liệu",
    "Vlog",
    "Video hướng dẫn",
    "Phim hài",
    "Video thử thách",
    "Video mở hộp",
    "Video nấu ăn",
    "Video chơi game",
    "Video đánh giá sản phẩm",
    "Video chia sẻ kỹ năng",
    "Video phỏng vấn",
    "Video kể chuyện",
    "Hoạt hình",
    "Bản tin",
    "Video du lịch",
    "Video tự làm",
    "Video thể hình",
    "Video truyền cảm hứng",
  ];

  const age = ["0-9", "10-16", "trên 18", "tất cả các độ tuổi"];
  return (
    <div className={clsx(Styles.formUpload)}>
      <h1>Upload Video</h1>
      <form onSubmit={handleUpload}>
        <div className={clsx(Styles.content)}>
          <div className={clsx(Styles.input)}>
            <div className={clsx(Styles.inputUpload)}>
              <div className={clsx(Styles.custom_file_upload)}>
                <input
                  id="file-upload"
                  type="file"
                  accept="video/*"
                  onChange={convertVideo}
                />
                <label htmlFor="file-upload">Chọn video</label>
              </div>
              {infoVideoUpload.fileVideo && (
                <video
                  style={{ height: 200, margin: 5 }}
                  controls
                  muted
                  autoPlay={true}
                  src={previewVideo}
                />
              )}
            </div>
            <input
              placeholder="Video name"
              onChange={(e) =>
                setInforVideoUpload({
                  ...infoVideoUpload,
                  nameVideo: e.target.value,
                })
              }
            />
            <div className="radio">
              {age.map((age, index) => {
                return (
                  <Radio
                    checked={age === infoVideoUpload.limitedAge}
                    value={age}
                    onChange={(e) =>
                      setInforVideoUpload({
                        ...infoVideoUpload,
                        limitedAge: e.target.value,
                      })
                    }
                    key={index}
                  >
                    {age}
                  </Radio>
                );
              })}
            </div>
          </div>
          <div className={clsx(Styles.categorys)}>
            {Category.map((genre, index) => {
              return (
                <Checkbox
                  className={clsx(Styles.inputCheckbox)}
                  value={genre}
                  onChange={handleChecked}
                  checked={genres.includes(genre)}
                  key={index}
                >
                  {genre}
                </Checkbox>
              );
            })}
          </div>
          <div
            style={{ display: "flex", flex: 1, flexDirection: "row-reverse" }}
          >
            <input
              style={{
                width: 150,
                height: 40,
                borderRadius: 10,

                backgroundColor: "green",
              }}
              type="submit"
              value={"Tải lên"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadVideo;
