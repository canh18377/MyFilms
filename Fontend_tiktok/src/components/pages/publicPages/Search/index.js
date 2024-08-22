import React, { useState, useContext } from "react";
import clsx from "clsx";
import Styles from "./search.module.scss";
import SearchVideos from "./searchVideos/SearchVideos";
import SearchUsers from "./searchUsers/SearchUsers";
import { SharedData } from "../../../Layout/DefaultLayout";
function Search() {
  const [status, setStatus] = useState(true);
  const { contentSearch } = useContext(SharedData);
  const [categorySearch, setCategorySearch] = useState("Users");
  console.log(contentSearch);
  let Videos;
  if (categorySearch === "Users") {
    Videos = SearchUsers;
  } else if (categorySearch === "Videos") {
    Videos = SearchVideos;
  }
  return (
    <div className={clsx(Styles.searchPage)}>
      <div className={clsx(Styles.Header)}>
        <h3
          className={clsx(Styles.contentSearch, {
            [Styles.choosen]: categorySearch === "Top",
          })}
          onClick={() => setCategorySearch("Top")}
        >
          Top
        </h3>
        <h3
          className={clsx(Styles.contentSearch, {
            [Styles.choosen]: categorySearch === "Users",
          })}
          onClick={() => setCategorySearch("Users")}
        >
          Users
        </h3>
        <h3
          className={clsx(Styles.contentSearch, {
            [Styles.choosen]: categorySearch === "Videos",
          })}
          onClick={() => setCategorySearch("Videos")}
        >
          Videos
        </h3>
      </div>
      {contentSearch && (
        <div className={clsx(Styles.content)}>
          {<Videos status={status} setStatus={setStatus} />}
        </div>
      )}
    </div>
  );
}

export default Search;
