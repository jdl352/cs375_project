import Link from "next/link";
import styles from "./foryou.module.css";
import ArticleRow from "../../components/articleRow/articleRow";

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("f523c32aa31c4dafa3ee1f62f6890100");

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

  console.log(articles);

  return articles.map((data) => (
    <ArticleRow
      title={data.title}
      date={data.publishedAt}
      source={data.source.name}
      likes={data.likes}
      id={data.id}
      link={data.url}
      tnail={data.urlToImage}
      author={data.author}
    />
  ));
}
// Format date to look nicer, might be different
// for each api result as well

export default function ForYou() {
  const articleRows = getArticles();

  return (
    <table className={styles.forYouTable}>
      <thead>
        <tr>
          <td></td>
          <td>Title</td>
          <td>Source</td>
          <td>Likes</td>
        </tr>
      </thead>
      <tbody>{articleRows}</tbody>
    </table>
  );
}
