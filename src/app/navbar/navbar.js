
import Link from "next/link";
import styles from "./navbar.module.css";
import { getServerSideProps } from "@/components/getProps";
import { cookies } from "next/headers";

// const props = await getServerSideProps();

export default function Navbar() {
  let username;
  if (cookies().has("username")) {
    username = cookies().get("username").value;
  } else {
    username = "Profile";
  }

  return (
    <header className={styles.navbar}>
      <ul className={styles.navbar_left}>
        <li>
          <Link href="/foryou">For You</Link>
        </li>
        <li>
          <Link href="/recent">Recent</Link>
        </li>
        <li>
          <Link href="/popular">Popular</Link>
        </li>
      </ul>
      <ul className={styles.navbar_right}>
        <li>
          <Link href="/profile">{username}</Link> |{" "}
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </header>
  );
}
