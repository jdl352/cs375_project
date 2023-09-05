import Link from "next/link";
import styles from "./foryou.module.css";
import ArticleRow from "../../components/articleRow/articleRow";
import getArticles from "@/components/getArticles/getArticles";
import { cookies } from "next/headers";

export default function ForYou() {
  let cats = cookies().get("categories").value.split(",");
  const articleRows = getArticles(cats);
  return (
    <table className={styles.forYouTable}>
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
