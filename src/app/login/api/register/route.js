import pool from "../../../../components/db";
import { NextResponse } from "next/server";

let argon2 = require("argon2");

function validateLogin(body) {
    if (!body.username || !body.password) {
        return false;
    }
    const { username, password } = body;

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return regex.test(password);
}

export async function POST(req) {
  
    const body = await req.json();
  
    if (!validateLogin(body)) {
    return NextResponse.json(
      { message: "Password requirements not met" },
      { status: 400 }
    );
  }

  const { username, password } = body;

  let hash;
  try {
    hash = await argon2.hash(password);
  } catch (error) {
    console.log("HASH FAILED", error);
    return NextResponse.json({ message: "Internal Issue" }, { status: 500 });
  }

  try {
    await pool.query(
      "INSERT INTO userlogin (username, password) VALUES ($1, $2)",
      [username, hash]
    );
  } catch (error) {
    console.log("INSERT FAILED", error);
    return NextResponse.json({ message: "Internal Issue" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
