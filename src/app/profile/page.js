import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Profile() {
  let username;
  if (cookies().has("username")) {
    username = cookies().get("username").value;
  } else {
    window.location.replace("http://localhost:3000/login");
  }

  let favoriteCategories = cookies().get("categories").value.split(",");

  let catRows = favoriteCategories.map((data) => (
    <tr>{data}</tr>
  ))

  return <div>
    <h2>{username}</h2>
    <div>
      <table>
        <thead>
          <tr>Favorite Categories</tr>
        </thead>
        {catRows}
      </table>
    </div>
  </div>;
}
