"use client";
import styles from "./articleRow.module.css";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

export default function ArticleRow(props) {
  const [likes, setLikes] = React.useState(props.likes);
  const [voted, setVoted] = React.useState(false);

  const [rowId] = React.useState(props.id);

  function increase_likes() {
    if (!voted) {
      setVoted(true);
      setLikes(likes + 1);
      document.getElementById("up" + rowId).style.backgroundColor = "blue";
    } else {
      setVoted(false);
      setLikes(likes - 1);
      document.getElementById("up" + rowId).style.backgroundColor = null;
    }
  }

  function decrease_likes() {
    if (!voted) {
      setVoted(true);
      setLikes(likes - 1);
      document.getElementById("down" + rowId).style.backgroundColor = "red";
    } else {
      setVoted(false);
      setLikes(likes + 1);
      document.getElementById("down" + rowId).style.backgroundColor = null;
    }
  }

  return (
    <tr className={styles.artRow} id={props.id}>
      <td>
        <Link href={props.link}>
          <Image src={props.tnail} width={200} height={150} alt="thumbnail" />
        </Link>
      </td>
      <td className={styles.title}>{props.title}</td>
      <td>
        {props.author}
        <br />
        {props.source}
      </td>
      <td>{props.date}</td>
    </tr>
  );
}
