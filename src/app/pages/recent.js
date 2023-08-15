import styles from "../page.module.css";

export async function getServerSideProps(){
    let {gnewsKey} = require('../../../env.json');
    let currDate = new Date();
    let lastSevenDays = new Date();
    lastSevenDays.setDate(currDate.getDate() - 7); // can do 7 days past 
    let response = await fetch(
        `https://gnews.io/api/v4/search?q=&from=${lastFewDaysDate.toISOString()}&token=${gnewsKey}`
    )
    let data = await response.json();
    return {
        props: {
            articles: data.articles,
        },
    };
}

export default function Recent({articles}){
    return(
        <main className={styles.main}>
            <div className={styles.description}>
                <h1>The Most Recent Articles:</h1>
                <ul>
                    {articles.map((article) => (
                        <li key={article.title}>{article.title}</li>
                    ))}
                </ul>
            </div>
        </main>
    );
}