"use client";
import styles from "./login.module.css";
import { redirect } from "next/dist/server/api-utils";
import withIronSessionApiRoute from "./api/login";

const doLogin = async (e) => {
  e.preventDefault();

  const username = document.getElementById("usernameField").value;
  const password = document.getElementById("passwordField").value;

  console.log(`Got username ${username}\nGot password ${password}`);

  const resp = await withIronSessionApiRoute({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });

  if (resp.ok) {
    console.log(`Recieved ${user}`);
    redirect("/");
  }
};

export default function Login() {
  return (
    <div>
      <div className={styles.formDiv}>
        <form id="loginForm" onSubmit={doLogin}>
          <input type="text" id="usernameField" placeholder="Username"></input>
          <br></br>
          <input
            type="password"
            id="passwordField"
            placeholder="Password"
          ></input>
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
