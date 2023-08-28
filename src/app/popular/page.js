"use client";
import Link from "next/link";
import styles from "./popular.module.css";
const BASE_URL = "https://newsapi.org/v2";
import React from "react";

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("f523c32aa31c4dafa3ee1f62f6890100");

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

newsapi.v2
  .topHeadlines({
    language: "en",
    pageSize: 20,
  })
  .then((response) => {
    for (let x = 0; x < 20; x++) {
      //20 is based on pageSize
      console.log(response.articles[x]);
      articles.push({
        name: response.articles[x].source.name,
        date: response.articles[x].publishedAt,
        category: "Business",
        id: x + 4,
        url: response.articles[x].url,
        likes: 7,
      });
    }
  });

articles.sort((a, b) => b.likes - a.likes);

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
