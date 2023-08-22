"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./recent.module.css";
const NewsAPI = require('newsapi');

export default function Recent() {
  let articles = [];

    const newsapi = new NewsAPI("7f5870e601864450971995b45b7846ed");

    newsapi.v2.everything({
      q: "apple",
      from: "2023-08-18",
      sortBy: "popularity",
      language: 'en'
    })
      .then((response) => {
        console.log("Total Articles:", response.totalResults);
        articles.push(response.articles);
      })
      .catch((error) => {
        console.log("error");
        console.error("Error fetching articles:", error);
      });
 

      const articleRows = articles.map((article) => (
        <tr key={article.url}>
          <td>
            <Link href={article.url}>{article.title}</Link>
          </td>
          <td>{article.source.name}</td>
          <td>{article.publishedAt}</td>
        </tr>
      ));
    
      return (
        <body>
          <table className={styles.recentTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Source</th>
                <th>Publish Date</th>
              </tr>
            </thead>
            <tbody>{articleRows}</tbody>
          </table>
        </body>
      );
    }