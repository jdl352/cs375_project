"use client";
import { useSearchParams } from "next/navigation";

export default function Article() {
  let params = useSearchParams();

  return (
    <body>
      <h1>BIG HEADLINE</h1>
      <p>This is the content for article {params.get("id")}</p>
      <p>lorem ipsum</p>
      <br></br>
      <div id="comments">
        Create Comment component which consists of joined comments fronm the
        database
      </div>
    </body>
  );
}
