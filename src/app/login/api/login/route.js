import pool from "../../../../components/db";
import { NextResponse } from "next/server";

let argon2 = require("argon2");

export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json(
      {
        message: "Username or Password not provided",
      },
      { status: 400 }
    );
  }

  try {
    let result = await pool.query(
      "SELECT password FROM userLogin WHERE username = $1",
      [username]
    );

    // username doesn't exist
    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          message: "Incorrect username or password",
        },
        { status: 400 }
      );
    }

    let hashed = result.rows[0].password;

    let verifyResult;
    try {
      verifyResult = await argon2.verify(hashed, password);
    } catch (error) {
      console.log("VERIFY FAILED", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    if (!verifyResult) {
      console.log("Credentials didn't match");
      return NextResponse.json(
        {
          message: "Credentials didn't match",
        },
        { status: 400 }
      );
    }

    let res = NextResponse.next();
    res.cookies.set("username", username);
    return res.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
