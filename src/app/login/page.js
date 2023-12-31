"use client"
import Link from "next/link";
import styles from "./login.module.css";
import redirect from "next/navigation";

export default function LoginForm(props) {
  const doLogin = (e) => {
    e.preventDefault();

    const username = document.getElementById("usernameField").value;
    const password = document.getElementById("passwordField").value;
    console.log(`Got username ${username}\nGot password ${password}`);

    fetch("/login/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    }).then((resp) => {
      if (resp.ok) {
        console.log(`Recieved ${username}`);
        window.location.replace("http://localhost:3000/recent")
      }
    });
  }

  return (
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
        <Link href={"/register"}>
          <button type="button">Register</button>
        </Link>
        &nbsp;&nbsp;&nbsp;<button type="submit">Submit</button>
      </form>
    </div>
  );
}