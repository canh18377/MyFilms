import { Col, Modal } from "antd";
import { SharedData } from "../../../../Layout/DefaultLayout";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Avatar } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import clsx from "clsx";
import Styles from "./list_follower_following.module.scss";
function List_Follower_Following() {
  const Navigate = useNavigate();
  const { profileInfo } = useContext(SharedData);
  const [followList, setFollowList] = useState([]);
  const [openModalFollowList, setOpenModalFollowList] = useState(false);
  const [totaOfFollow, setTotalOfFollow] = useState({
    follower: 0,
    follwing: 0,
  });
  console.log(profileInfo);
  const getFollowList = async (isFollow) => {
    try {
      const response = await fetch(
        `http://localhost:8080/profile/getFollowList/${profileInfo.author}/${isFollow}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error`);
      }
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setFollowList(data);
        setOpenModalFollowList(true);
      }
    } catch (error) {
      message.error("server bận");
      console.log(error);
    }
  };
  const handleClickUser = (author) => {
    Navigate(`/profile/${author}`);
    window.location.reload();
  };
  return (
    <div style={{ display: "flex" }}>
      <Modal
        open={openModalFollowList}
        onCancel={() => setOpenModalFollowList(false)}
        footer={false}
      >
        {
          <div>
            {followList.length === 0 ? (
              <div className={clsx(Styles.note)}>
                <FrownOutlined className={clsx(Styles.iconNote)} />
                <h3 className={Styles.noteText}>Chưa có ai trong danh sách</h3>
              </div>
            ) : (
              followList.map((user, index) => {
                return (
                  <div
                    onClick={() => handleClickUser(user.author)}
                    className={clsx(Styles.user)}
                    key={index}
                  >
                    <Avatar src={user.profilePhoto.path} size={30} />
                    <p>{user.name}</p>
                  </div>
                );
              })
            )}
          </div>
        }
      </Modal>
      <p
        onClick={() => getFollowList("isFollower")}
        style={{ marginRight: 10, cursor: "pointer" }}
      >
        Follower
      </p>
      <p
        onClick={() => getFollowList("isFollowing")}
        style={{ cursor: "pointer" }}
      >
        Following
      </p>
    </div>
  );
}

export default List_Follower_Following;
