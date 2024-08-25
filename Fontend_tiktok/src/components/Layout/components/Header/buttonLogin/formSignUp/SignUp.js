import clsx from "clsx";
import Styles from "./formSignUp.module.scss";
import { Button, message } from "antd";
import { useState } from "react";
function SignUp({ setIsLogIn }) {
  const [account, setAccount] = useState({ name: "", password: "" });
  const handleSignUp = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/account/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account),
    })
      .then((response) => {
        if (!response.ok) {
          message.error("server bận ,vui lòng thử lại sau");
        } else return response.json();
      })
      .then((data) => {
        if (data.success) {
          message.success(data.success);
        } else message.error(data.fail);
      })

      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  return (
    <div className={clsx(Styles.formSignUp)}>
      <h1>SignUp</h1>
      <form onSubmit={handleSignUp}>
        <div className={clsx(Styles.input)}>
          <input
            value={account.name}
            onChange={(e) => setAccount({ ...account, name: e.target.value })}
            className={clsx(Styles.inputName)}
            placeholder="Account"
          />
          <input
            value={account.password}
            type="password"
            onChange={(e) =>
              setAccount({ ...account, password: e.target.value })
            }
            className={clsx(Styles.inputPassword)}
            placeholder="Password"
          />
        </div>
        <div className={clsx(Styles.buttonForm)}>
          <Button
            className={clsx(Styles.buttonSignUP)}
            htmlType="submit"
            type="primary"
          >
            Sign UP
          </Button>
        </div>
        <div>
          <hr />
          <p>
            Do have an account?
            <u
              onClick={() => setIsLogIn(true)}
              style={{ color: "red", cursor: "pointer" }}
            >
              {" "}
              Log In
            </u>
          </p>
        </div>
      </form>
    </div>
  );
}
export default SignUp;
