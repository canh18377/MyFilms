import {
  LikeOutlined,
  DeleteOutlined,
  DislikeOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import clsx from "clsx";
import Styles from "./actionComment.module.scss";
import { useEffect, useState } from "react";
import { message, Modal } from "antd";

function ActionComment({
  currentUser,
  idCommenter,
  contentComment,
  idComment,
  setISLoading,
  replies,
  like_disLike_List,
  setLike_disLike_List,
}) {
  const [isModalDeleteComment, setIsModalDeleteComment] = useState(false);
  const [isModalUpdateComment, setIsModalUpdateComment] = useState(false);
  const [commentContent, setCommentContent] = useState(contentComment);

  const [islogged, setIsLogged] = useState(() => {
    if (localStorage.getItem("profileInfo")) {
      return true;
    } else return false;
  });

  const deleteComment = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/videoComments/deleteComment",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idComment }),
        }
      );
      if (!response) {
        throw new Error("Network is fail");
      }
      const data = await response.json();
      if (data.error) {
        message.error(data.error);
      } else {
        setIsModalDeleteComment(false);
        message.success(data.success);
        setISLoading((pre) => !pre);
      }
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra , thử lại sau");
    }
  };
  const updateComment = async () => {
    if (commentContent.trim() === contentComment) {
      message.warning("Bình luận chưa được thay đổi ");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/videoComments/updateComment",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ commentContent, idComment }),
        }
      );
      if (!response) {
        throw new Error("Network is fail");
      }
      const data = await response.json();
      if (data.error) {
        message.error(data.error);
      } else {
        setIsModalUpdateComment(false);
        message.success(data.success);
        setISLoading((pre) => !pre);
      }
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra , thử lại sau");
    }
  };
  ///like dislike
  const Like_DisLikeComment = (isLike_DisLike, idComment) => {
    if (islogged) {
      setLike_disLike_List((pre) => {
        const newList_DisLike = pre.disLike.includes(idComment);
        const newList_Like = pre.like.includes(idComment);
        if (isLike_DisLike === "isLike") {
          return {
            ...pre,
            like: newList_Like
              ? pre.like.filter((id) => id !== idComment)
              : [...pre.like, idComment],

            disLike: newList_DisLike
              ? pre.disLike.filter((id) => id !== idComment)
              : [...pre.disLike],
          };
        }
        if (isLike_DisLike === "isDisLike") {
          return {
            ...pre,
            disLike: newList_DisLike
              ? pre.disLike.filter((id) => id !== idComment)
              : [...pre.disLike, idComment],
            like: newList_Like
              ? pre.like.filter((id) => id !== idComment)
              : [...pre.like],
          };
        }
      });
    } else message.warning("Hãy đăng nhập để tiếp tục");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Modal
        open={isModalDeleteComment}
        onCancel={() => setIsModalDeleteComment(false)}
        onOk={() => deleteComment()}
      >
        <div>
          <h3>Bạn chắc chắn muốn xóa bình luận này!</h3>
          <p style={{ color: "red" }}>#{contentComment}</p>
        </div>
      </Modal>
      <Modal
        open={isModalUpdateComment}
        onCancel={() => setIsModalUpdateComment(false)}
        okText="Update"
        onOk={() => updateComment()}
      >
        <div style={{ width: "100%" }}>
          <h3>Bạn muốn chỉnh sửa bình luận này!</h3>
          <input
            style={{
              width: "100%",
              borderRadius: 10,
              color: "red",
              fontFamily: "cursive",
              height: 25,
            }}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
        </div>
      </Modal>

      {currentUser && currentUser.currentUserId === idCommenter && (
        <div>
          <DeleteOutlined
            onClick={() => setIsModalDeleteComment(true)}
            className={clsx(Styles.actionComment)}
          />
        </div>
      )}
      {currentUser && currentUser.currentUserId === idCommenter && (
        <div>
          <ToolOutlined
            onClick={() => setIsModalUpdateComment(true)}
            className={clsx(Styles.actionComment)}
          />
        </div>
      )}
      {
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <LikeOutlined
            onClick={() => Like_DisLikeComment("isLike", idComment)}
            className={clsx(Styles.actionComment, {
              [Styles.colorAction]: like_disLike_List.like.includes(idComment),
            })}
          />
          {like_disLike_List.like.includes(idComment)
            ? replies.like + 1
            : replies.like}
        </div>
      }
      {
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <DislikeOutlined
            onClick={() => Like_DisLikeComment("isDisLike", idComment)}
            className={clsx(Styles.actionComment, {
              [Styles.colorAction]:
                like_disLike_List.disLike.includes(idComment),
            })}
          />
          {like_disLike_List.disLike.includes(idComment)
            ? replies.disLike + 1
            : replies.disLike}
        </div>
      }
    </div>
  );
}

export default ActionComment;
