import Link from "next/link";
import styles from "./recent.module.css";
import ArticleRow from "@/components/articleRow/articleRow";
import getArticles from "@/components/getArticles/getArticles";


// Format date to look nicer, might be different
// for each api result as well

export default function Recent() {
  const articleRows = getArticles({
    category: "science",
    categoryTwo: "technology", 
    categoryThree: "health",   
  });
  return (
    <table className={styles.recentTable}>
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
