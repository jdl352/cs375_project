"use client";
import styles from "./subForm.module.css";

export default function SubForm(props) {
  const catSubscribe = (e) => {
    e.preventDefault();

    let options = [
      "business",
      "entertainment",
      "general",
      "science",
      "health",
      "sports",
      "technology",
    ];
    let selected = "";

    for (let opt of options) {
      if (document.getElementById(`${opt}Sub`).checked) {
        selected = selected.concat(opt, ",");
      }
    }

    fetch("/profile/subscribe/api", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({subs: selected})
    })

  };

  let cats = props.cats;

  return (
    <form id="categoryForm" onSubmit={catSubscribe} className={styles.SubForm}>
      <label>
        <input
          type="checkbox"
          id="businessSub"
          defaultChecked={props.cats.includes("business")}
        />
        Business
      </label>

      <label>
        <input
          type="checkbox"
          id="entertainmentSub"
          defaultChecked={props.cats.includes("entertainment")}
        />
        Entertainment
      </label>

      <label>
        <input
          type="checkbox"
          id="generalSub"
          defaultChecked={props.cats.includes("general")}
        />
        General
      </label>

      <label>
        <input
          type="checkbox"
          id="healthSub"
          defaultChecked={props.cats.includes("health")}
        />
        Health
      </label>

      <label>
        <input
          type="checkbox"
          id="scienceSub"
          defaultChecked={props.cats.includes("science")}
        />
        Science
      </label>

      <label>
        <input
          type="checkbox"
          id="sportsSub"
          defaultChecked={props.cats.includes("sports")}
        />
        Sports
      </label>

      <label>
        <input
          type="checkbox"
          id="technologySub"
          defaultChecked={props.cats.includes("technology")}
        />
        Technology
      </label>
      <button type="submit">Update Preferences</button>
    </form>
  );
}
