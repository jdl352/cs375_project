import { withIronSessionApiRoute } from "iron-session/next";
let tokenStorage = require("../tokenStorage.json");

//expects POST request with active session to destroy()

export default withIronSessionApiRoute(
  function logoutRoute(req, res) {
    req.session.destroy();
    res.json({ ok: true });
  },
  //TODO maybe export this options as an object in another json
  {
    cookieName: "token375",
    password: tokenStorage,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);