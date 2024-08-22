import { Modal, Button, Avatar, message } from "antd";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Styles from "./formUpdate.module.scss";
function FormUpdate({ profileInfo, setProfileInfo }) {
  const Token = localStorage.getItem("jwtToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState("");
  const profileInfoLocal = JSON.parse(localStorage.getItem("profileInfo"));

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("profilePhoto", profileInfo.profilePhoto);
    formData.append("caption", profileInfo.caption);
    formData.append("name", profileInfo.name);
    setIsModalOpen(false);
    fetch("http://localhost:8080/profile/update", {
      method: "POST",
      headers: { Authorization: `${Token}` },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          console.log("no res");
          return;
        } else return res.json();
      })
      .then((data) => {
        setProfileInfo(data);
        message.success("thay đổi thành công");
      })
      .catch(() => {
        message.error("server bận");
      });
  };
  useEffect(() => {
    return () => {
      previewPhoto && URL.revokeObjectURL(previewPhoto);
    };
  }, [previewPhoto]);

  function convertPhoto(e) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const link = URL.createObjectURL(file);
      setProfileInfo({ ...profileInfo, profilePhoto: file });
      setPreviewPhoto(link);
      e.target.value = "";
    } else {
      console.log("no file");
    }
  }
  return (
    <div className="container">
      <Modal
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        onOk={handleSubmit}
        okText={"save"}
      >
        <h1>Edit Profile</h1>
        <form>
          <div className={clsx(Styles.formGroup)}>
            <label htmlFor="profilePhoto">Profile photo</label>
            <input
              type="file"
              accept="image/*"
              id="profilePhoto"
              onChange={convertPhoto}
            />
            {previewPhoto && <Avatar size={100} src={previewPhoto} />}
          </div>

          <div className={clsx(Styles.formGroup)}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="name"
              value={profileInfo.name}
              onChange={(e) => {
                setProfileInfo({ ...profileInfo, name: e.target.value });
              }}
            />
            <p>
              Usernames can only contain letters, numbers, underscores, and
              periods. Changing your username will also change your profile
              link.
            </p>
          </div>

          <div className={clsx(Styles.formGroup)}>
            <label htmlFor="caption">caption</label>
            <input
              type="text"
              id="caption"
              placeholder="caption"
              value={profileInfo.caption}
              onChange={(e) => {
                setProfileInfo({ ...profileInfo, caption: e.target.value });
              }}
            />
          </div>
        </form>
      </Modal>
      {profileInfoLocal.author === profileInfo.author && (
        <Button onClick={() => setIsModalOpen(true)}>sửa thông tin</Button>
      )}
    </div>
  );
}

export default FormUpdate;
