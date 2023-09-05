import ThreadRow from "../threadRow";

export function getThreads() {
  fetch("http://localhost:3000/threads/api", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      let threadData = res.result.rows;
      let rows = threadData.map((thread) => (
        <ThreadRow
          threadid={thread.threadid}
          username={thread.username}
          message={thread.message}
          url={thread.url}
          date_created={thread.date_created}
        />
      ));
      console.log(rows);
      return rows;
    });
}
