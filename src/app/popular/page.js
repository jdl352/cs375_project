"use client";
import Link from "next/link";
import styles from "./popular.module.css";

let articles = [
  {
    name: "Article 1",
    date: "20230814",
    category: "Science",
    id: 1,
    likes: 10,
  },
  {
    name: "Article 2",
    date: "20230810",
    category: "Politics",
    id: 2,
    likes: 20,
  },
  {
    name: "Article 3",
    date: "20230728",
    category: "Environment",
    id: 3,
    likes: 5,
  },
];

// TODO: Rolling window?
articles.sort((a, b) => b.likes - a.likes);

// Format date to look nicer, might be different
// for each api result as well

export default function Popular() {
  const articleRows = articles.map((article) => (
    <tr key={article.id}>
      <td>
        <Link href={"/article?id=" + article.id}>{article.name}</Link>
      </td>
      <td>{article.category}</td>
      <td>{article.date}</td>
    </tr>
  ));
  return (
    <table className={styles.popularTable}>
      <thead>
        <tr>
          <td>Name</td>
          <td>Tags</td>
          <td>Publish Date</td>
        </tr>
      </thead>
      <tbody>{articleRows}</tbody>
    </table>
  );
}
