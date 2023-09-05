"use client";
import Link from "next/link";
import styles from "./navbar.module.css";

// const props = await getServerSideProps();

export default function Navbar() {
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
          <Link href="/threads">Threads</Link>
        </li>
      </ul>
      <ul className={styles.navbar_right}>
        <li>
          <Link href="/profile">Profile</Link> |{" "}
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </header>
  );
}
