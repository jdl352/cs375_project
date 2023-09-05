"use client";
export default function ThreadRow(props) {
  return (
    <tr id={props.threadid}>
      <td>{props.threadid}</td>
      <td>{props.username}</td>
      <td>{props.message}</td>
      <td>{props.url}</td>
      <td>{props.date_created}</td>
    </tr>
  );
}
