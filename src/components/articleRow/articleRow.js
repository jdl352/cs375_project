"use client";
import styles from "./articleRow.module.css";
import Link from "next/link";

export default function ArticleRow(props) {
  return (
    <tr className={styles.artRow} id={props.id}>
      <td>
        <image src={props.tnail}></image>
      </td>
      <td>
        <Link href={props.link}>{props.title}</Link>
        <br />
        {props.date}
      </td>
      <td>
        {props.author}
        <br />
        {props.source}
      </td>
      <td>{props.likes}</td>
    </tr>
  );
}
