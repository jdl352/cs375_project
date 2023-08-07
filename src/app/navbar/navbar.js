import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <header>
      <ul>
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
            <Link href="/profile">Insert username here</Link>
        </li>
      </ul>
    </header>
  );
}
