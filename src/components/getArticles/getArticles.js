
import Link from "next/link";
import Image from "next/image";
import ArticleRow from "@/components/articleRow/articleRow";

export default async function getArticles(props) {
    const NewsAPI = require("newsapi");
    const newsapi = new NewsAPI("7f5870e601864450971995b45b7846ed");

    let fetch_size = 20;
    let articles = [];
  
    let response = await newsapi.v2.topHeadlines({
      language: "en",
      pageSize: fetch_size,
      category: props.category,
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
        likes={0}
      />
    ));
  }
