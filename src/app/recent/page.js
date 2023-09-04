import Link from "next/link";
import styles from "./recent.module.css";
import ArticleRow from "@/components/articleRow/articleRow";

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
    articles.push(article);
  }

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
    />
  ));
}

// Format date to look nicer, might be different
// for each api result as well

export default function Recent() {
  const articleRows = getArticles();
  return (
    <table className={styles.recentTable}>
      <thead>
        <tr>
          <td></td>
          <td>Title</td>
          <td>Source</td>
          <td>Published</td>
        </tr>
      </thead>
      <tbody>{articleRows}</tbody>
    </table>
  );
}
