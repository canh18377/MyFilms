import { SharedData } from "../../../../Layout/DefaultLayout";
import { useContext, useEffect } from "react";
import { message } from "antd";
function SearchVideos() {
  const { contentSearch } = useContext(SharedData);
  useEffect(() => {
    fetch(`http://localhost:8080/search/videos/${contentSearch}`, {
      headers: { "Content/Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          message.error("server bận");
        } else return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        message.error("Có lỗi xảy ra");
      });
  }, []);
  return <h1>content video</h1>;
}

export default SearchVideos;
