import { SharedData } from "../../../../Layout/DefaultLayout";
import { useContext, useState, useEffect } from "react";
import { Avatar, message } from "antd";
import clsx from "clsx";
import Styles from "./searchUsers.module.scss";
function SearchUsers() {
  const [foundUsers, setFoundUsers] = useState([]);
  const { contentSearch } = useContext(SharedData);
  const handleClickUser = () => {};
  console.log("contentSearch", contentSearch);
  useEffect(() => {
    fetch(`http://localhost:8080/search/users/${contentSearch}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          message.error("server bận");
        } else return res.json();
      })
      .then((data) => {
        console.log(data);
        const { listUsers } = data;
        setFoundUsers(listUsers);
      })
      .catch((error) => {
        console.log(error);
        message.error("Có lỗi xảy ra");
      });
  }, [contentSearch]);
  if (foundUsers.length === 0) {
    return <h1>không tìm thấy user</h1>;
  }
  return (
    <div>
      {foundUsers.map((user, index) => {
        return (
          <div
            onClick={() => handleClickUser()}
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
