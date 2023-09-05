import pool from "../../../components/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  //const body = await req.json();

  //const subs = body.subs.split(",");

  //cookies().set("categories", subs);

  //const username = cookies().get("username").value;
  let result;
  try {
    result = await pool.query(
      "SELECT * FROM threads"
    );
    console.log(result);
  } catch (error) {
    console.log("UPDATE FAILED", error);
    return NextResponse.json({ message: "Internal Issue" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, "result": result }, { status: 200 });
}