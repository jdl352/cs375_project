import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SubForm from "./subscribe/subForm";

export default function Profile() {
  
  let username;
  if (cookies().has("username")) {
    username = cookies().get("username").value;
  } else {
    window.location.replace("http://localhost:3000/login");
  }

  let favoriteCategories = cookies().get("categories").value.split(",");
  console.log(favoriteCategories);

  return <div>
    <h2>{username} Preferences</h2>
    <div>
        <SubForm 
        cats={favoriteCategories}/>
    </div>
  </div>;
}
