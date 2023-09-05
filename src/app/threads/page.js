"use client"
import React, { useState, useEffect } from "react";
import styles from "./threads.module.css";
import { getThreadDataAll } from "../dbconn/threaddata";

function Threads() {
  const [threadData, setThreadData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getThreadDataAll();
        setThreadData(data);
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    }

    fetchData();
  }, []);

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
      <tbody>
        {threadData.map((thread) => (
          <tr key={thread.id}>
            <td>{thread.id}</td>
            <td>{thread.username}</td>
            <td>{thread.message}</td>
            <td>{thread.url}</td>
            <td>{thread.date_created}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Threads;
