import pool from "../../../components/db";
import { withIronSessionApiRoute } from "iron-session/next";

let argon2 = require("argon2");

let tokenStorage = require("./tokenStorage.json");

export default withIronSessionApiRoute(
  async (req, res) => {
    const { username, password } = await req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Username or Password not provided" });
    }

    try {
      let result = await pool.query(
        "SELECT password FROM userLogin WHERE username = $1",
        [username]
      );

      // username doesn't exist
      if (result.rows.length === 0) {
        return res
          .status(400)
          .json({ message: "Incorrect username or password" });
      }

      let hashed = result.rows[0].password;

      let verifyResult;
      try {
        verifyResult = await argon2.verify(hashed, password);
      } catch (error) {
        console.log("VERIFY FAILED", error);
        return res.status(500).json({ message: error.message });
      }

      if (!verifyResult) {
        console.log("Credentials didn't match");
        return res.status(400).json({ message: "Credentials didn't match" });
      }

      const user = { isLoggedIn: true, username: username };
      req.session.user = user;
      await req.session.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //TODO maybe export this options as an object in another json
  {
    cookieName: "token375",
    password: tokenStorage,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
