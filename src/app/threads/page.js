import styles from "./threads.module.css";
import { getThreads } from "./getThreads/getThreads";

async function Threads() {
  const rows = getThreads();
  console.log(rows);
  return (
    <table className={styles.threadTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Message</th>
          <th>URL</th>
          <th>Date Created</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default Threads;
