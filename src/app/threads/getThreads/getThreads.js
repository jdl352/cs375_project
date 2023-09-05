import ThreadRow from "../threadRow";

export async function getThreads() {
  let res = fetch("http://localhost:3000/threads/api", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  let body = await (await res).json();
  let threadData = body.result.rows;
  console.log(threadData);
  return threadData.map((thread) => (
    <ThreadRow
      threadid={thread.threadid}
      username={thread.username}
      message={thread.messagebody}
      url={thread.url}
      date_created={thread.dt}
    />
  ));
}
