import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Optional để thêm kiểu dáng
import Styles from "./header.module.scss";
import "tippy.js/themes/light.css";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Button } from "antd";
import ButtonLogIn from "./buttonLogin/ButtonLogIn";
import { SharedData } from "../../DefaultLayout";
function Header() {
  const [backGroundColor, setBackGroundColor] = useState(false);
  const navigate = useNavigate();
  const {
    isLoged,
    setIsLoged,
    isModelOpen,
    setIsModelOpen,
    contentSearch,
    setContentSearch,
    history,
    setHistory,
  } = useContext(SharedData);
  const handleNavigate = () => {
    navigate("/");
  };
  const handleUpload = () => {
    isLoged ? navigate("/upload") : setIsModelOpen(true);
  };

  const handelClick = () => {
    document.body.style.backgroundColor = backGroundColor ? "white" : "black";
    setBackGroundColor(backGroundColor === false ? true : false);
  };
  const storeContentSearch = (e) => {
    setContentSearch(e);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    setHistory((prev) => [...history, contentSearch]);
    navigate("/search");
  };

  return (
    <div className={clsx(Styles.header)}>
      <div>
        <img
          onClick={() => handleNavigate()}
          className={clsx(Styles.iconHeader)}
          src="https://th.bing.com/th?id=OIP.8oT7MA38kth5XuGYz6K26gHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
        />
      </div>
      <Tippy
        interactive={true}
        theme="light"
        appendTo={document.body}
        content={history.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      >
        <div className={clsx(Styles.searchHeader)} tabIndex={0}>
          <form onSubmit={handleSearch}>
            <input
              value={contentSearch}
              onChange={(e) => storeContentSearch(e.target.value)}
              tabIndex={0}
              className={clsx(Styles.inputHeader)}
              placeholder="Tìm kiếm"
            />
            <input type="submit" style={{ display: "none" }} />
          </form>
        </div>
      </Tippy>
      {isLoged && (
        <div className={clsx(Styles.buttonUpload)}>
          <Button onClick={() => handleUpload()} danger type="primary">
            <span style={{ marginTop: 15 }}>
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L6 8h4v6h4V8h4L12 2z" />
              </svg>
            </span>
            <span>Upload</span>
          </Button>
        </div>
      )}

      <div className={clsx(Styles.sideAction)}>
        <ButtonLogIn
          isLoged={isLoged}
          setIsLoged={setIsLoged}
          isModelOpen={isModelOpen}
          setIsModelOpen={setIsModelOpen}
        />

        <Tippy
          interactive={true}
          theme="light"
          appendTo={document.body}
          content={
            <div>
              <h2
                onClick={() => handelClick()}
                tabIndex={0}
                className={clsx(Styles.backGroundColor)}
              >
                Chế độ tối{" "}
                {backGroundColor && (
                  <span className={clsx(Styles.icon)}>✓</span>
                )}{" "}
              </h2>
            </div>
          }
        >
          <img
            className={clsx(Styles.explore)}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAYFBMVEX///8BAQH8/PwlJSXd3d3n5+evr6/39/dGRkbz8/M2NjYoKCjs7OzLy8shISFxcXFZWVmZmZlNTU2np6e/v78MDAw+Pj4vLy+IiIjX19eAgIBpaWmSkpITExO4uLgZGRmk2Hx/AAADx0lEQVR4nO3d0XaiMBQF0HBNQBSKCCoU2/7/Xw6gjlYhwMysSU/W2U99vKeGJCQxKkVERERERERERERERP+LiDz87bCQf6AtX2Kj07JMtYnBw6i4DptD0Ds0oY77fJiitFoFD7ZVGqGmMedT8GSTG8w0unmO0mlqxK6gXg9lCYJ1jffZmJcmdnMyrmtbpm1Hm7Es7YPjurxlRFXjWYKgcl3fMsaWJQgS1/UtMtiR3TWu61tCv9nDvGnXFS5wPtjDHM6uK5yrHUV29ixBsHNd5FyizMh4ebdGGWtEpZZB5mKTuq5yts/tVJjtp+saZwtXU2FWoesaZ/MrjE/NzKsOwKOuWfk0aLZyb6YzLePTRFNl9jCZ6/oWSexhYqQ1DVG5LUvuur5FRNR+PMvedXmLJaNjzRprBaBnRgabnQFc0VQm+3iN8pGBLjYnxUtTWxeAbexC6vz4GOWY15CfylWky/frFHrzXurIdT1/K06MTmttEuRtMyIiIiJfXF/FAN/IBkgcJ0kMf9pMde8AafHe7HbNe5FCvwGIitP84WVznae4caSunjZqTmfMV01RUTiw2rQPI8S+IMoHNwO3OeDJRjkPLDT1i01nsDBtOwqHo3QK1+UtI0qPZwkCqN2Z1kgbu7Y019UtU9iydA0N6LGJJvbON0iD5+eXPcwXzpmGyS1NoE3Ndkpm2Ta72Meuq5ytPk6FOdaua5ytHD1tfnMqXdc4k/h0RMurMLPOm6GEEZ+eGc96s2h6nAGaz/gzA2iVU3MznEemNTVrhtp4trw0d0KkLKKsIw3WBzPxPS2gc8DqsjozugrwgTL630kxcoL2DWoB4EKkGOzSNgVclE5UDpwF3JVAY/9v3f9f508zzlOOtv73INLFwzRtX9SIH8udJDqssqbJqlAnAriZ8Ux6/V+uSyEiIiL6E6I4kfmJEl13l7XV3aQZmHQHzsLs9v2ZLExxdjJfSVp9WwfYVKCn59o2ZfKXrY3NGWvN7CpSejfw3fNDA7kKoEd2nI5waUQlo5u0W7BvN7YPjGVb8+S6vKV8uqzNehCwOwqINIDysrYfSXy6rE1k+t4ZlGfGq8vavLqrSXw61eTb/WY+hfHqTkCPOgCvLmsT8emyNpm+rA3p6ikz0Z2tUFpZb/IVAGVu1ontYWKkAwGTl7XhROkXNCyngXG6spvxy9r2UDcCXuixy9qwVjN6ovTgUe0Mqle+EZW8ngU84l7WFunz99+fyTVcC3sQmTK7/TJQViaAXzj/TqJY17WOI/AcRERERERERERERERofgFaIiUBFXSP3AAAAABJRU5ErkJggg=="
          />
        </Tippy>
      </div>
    </div>
  );
}
export default Header;
