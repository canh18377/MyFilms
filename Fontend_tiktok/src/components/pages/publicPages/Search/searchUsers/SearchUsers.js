import { SharedData } from "../../../../Layout/DefaultLayout";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, message, Progress } from "antd";
import clsx from "clsx";
import Styles from "./searchUsers.module.scss";
function SearchUsers({ status, setStatus }) {
  const Navigate = useNavigate();
  const [foundUsers, setFoundUsers] = useState([]);
  const { contentSearch } = useContext(SharedData);
  const handleClickUser = (author) => {
    Navigate(`/profile/${author}`);
  };
  console.log("contentSearch:", contentSearch);
  useEffect(() => {
    fetch(
      `http://localhost:8080/search/users/${encodeURIComponent(contentSearch)}`,
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
        console.log(data);
        const { listUsers } = data;
        setFoundUsers(listUsers);
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
    <div>
      {foundUsers.map((user, index) => {
        return (
          <div
            onClick={() => handleClickUser(user.author)}
            className={clsx(Styles.user)}
            key={index}
          >
            <Avatar src={user.profilePhoto.path} size={50} />
            <p>{user.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SearchUsers;
