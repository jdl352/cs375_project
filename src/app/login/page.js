import styles from "./login.module.css";
import { redirect } from "next/dist/server/api-utils";
import LoginForm from "./form/form";
import withIronSessionApiRoute from "./api/login";

export default function Login() {
  return (
      <LoginForm/>
  );
}
