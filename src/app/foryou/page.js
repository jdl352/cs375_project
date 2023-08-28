import Link from "next/link";
import styles from "./foryou.module.css";
import ArticleRow from "../../components/articleRow/articleRow";

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

articles.sort((a, b) => b.date - a.date);

// Format date to look nicer, might be different
// for each api result as well

export default function ForYou() {
  const articleRows = articles.map((data) => (
    <ArticleRow
      name={data.name}
      date={data.date}
      category={data.category}
      likes={data.likes}
      id={data.id}
    />
  ));
  return (
    <table className={styles.forYouTable}>
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
