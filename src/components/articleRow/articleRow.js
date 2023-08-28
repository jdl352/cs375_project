"use client";
import styles from "./articleRow.module.css"

export default function ArticleRow(props) {
    return (
       <tr className={styles.artRow} id={props.id}>
        <td>
            {props.name}<br/>
            {props.date}
        </td>
        <td>
            {props.category}
        </td>
        <td>
            {props.likes}
        </td>
       </tr> 
    )
}