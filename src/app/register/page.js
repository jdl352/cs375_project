"use client";
import Link from "next/link";
import styles from "./register.module.css";
import { redirect } from "next/navigation";

export default function RegisterForm(props) {
  const doRegister = (e) => {
    e.preventDefault();

    const username = document.getElementById("usernameField").value;
    const password = document.getElementById("passwordField").value;
    console.log(`Got username ${username}\nGot password ${password}`);

    fetch("/login/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    }).then((resp) => {
      if (resp.ok) {
        console.log(`Recieved ${username}`);
        window.location.replace("http://localhost:3000/login");
      }
    });
  };

  return (
    <div className={styles.formDiv}>
      <form id="loginForm" onSubmit={doRegister}>
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
  );
}
