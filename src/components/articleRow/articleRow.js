"use client";
import styles from "./articleRow.module.css";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

export default function ArticleRow(props) {
  const [likes, setLikes] = React.useState(props.likes);
  const [voted, setVoted] = React.useState(false);

  function increase_likes() {
    if (!voted) {
      setVoted(true);
      setLikes(likes + 1);
      document.getElementById("up" + props.id).style.backgroundColor = "blue";
    } else {
      setVoted(false);
      setLikes(likes - 1);
      document.getElementById("up" + props.id).style.backgroundColor = null;
    }
  }

  function decrease_likes() {
    if (!voted) {
      setVoted(true);
      setLikes(likes - 1);
      document.getElementById("down" + props.id).style.backgroundColor = "red";
    } else {
      setVoted(false);
      setLikes(likes + 1);
      document.getElementById("down" + props.id).style.backgroundColor = null;
    }
  }

  return (
    <tr className={styles.artRow} id={props.id}>
      <td>
      <Link href={props.link}><Image src={props.tnail} width={200} height={150} alt="thumbnail" /></Link>
      </td>
      <td className={styles.title}>
        {props.title}
      </td>
      <td>
        {props.author}
        <br />
        {props.source}
      </td>
      <td>{props.date}</td>
      <td className={styles.likes}>
        {likes}
        <button onClick={increase_likes} id={"up" + props.id}>
          <Image
            src="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-up-01-512.png"
            width={30}
            height={30}
            alt="upvote"
          ></Image>
        </button>
        <button onClick={decrease_likes} id={"down" + props.id}>
          <Image
            src="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-down-01-512.png"
            width={30}
            height={30}
            alt="downvote"
          ></Image>
        </button>
      </td>
    </tr>
  );
}
