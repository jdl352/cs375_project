import Link from "next/link";
import styles from "./popular.module.css";
const BASE_URL = "https://newsapi.org/v2";
import React from "react";
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('API_KEY');
let articles = [];
newsapi.v2.topHeadlines({
  category: 'business',
  language: 'en',
  pageSize: 20
}).then(response => {
  articles = [];
  for(let x = 0; x < 20; x++){ //20 is based on pageSize
    // console.log(x);
    articles.push({
    name:response.articles[x].source.name,
    date:response.articles[x].publishedAt,
    category:'Business',
    id: x,
    url: response.articles[x].url,
    likes: 0 });
  }

});


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
    <body>
      <table className={styles.popularTable}>
        <thead>
          <td>Name</td>
          <td>Tags</td>
          <td>Publish Date</td>
        </thead>
        <tbody>{articleRows}</tbody>
      </table>
    </body>
  );
}
