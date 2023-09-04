import Link from "next/link";
import styles from "./popular.module.css";
const BASE_URL = "https://newsapi.org/v2";
import React from "react";
import ArticleRow from "../../components/articleRow/articleRow";

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("API Key");

let fetch_size = 20;

async function getArticles() {
  let articles = [];

  let response = await newsapi.v2.topHeadlines({
    language: "en",
    pageSize: fetch_size,
  });

  for (let article of response.articles) {
    article.likes = Math.floor(50 * Math.random());
    articles.push(article);
  }

  articles.sort((a, b) => b.likes - a.likes);

  let ids = 0;

  return articles.map((data) => (
    <ArticleRow
      title={data.title}
      date={data.publishedAt}
      source={data.source.name}
      id={ids++}
      link={data.url}
      tnail={
        data.urlToImage != null
          ? data.urlToImage
          : "https://e7.pngegg.com/pngimages/422/126/png-clipart-newspaper-computer-icons-symbol-news-icon-text-logo.png"
      }
      author={data.author}
      likes={data.likes}
    />
  ));
}

export default function Popular() {
  const articleRows = getArticles();

  return (
    <table className={styles.popularTable}>
      <thead>
        <tr>
          <td></td>
          <td>Title</td>
          <td>Source</td>
          <td>Published</td>
          <td>Likes</td>
        </tr>
      </thead>
      <tbody>{articleRows}</tbody>
    </table>
  );
}
