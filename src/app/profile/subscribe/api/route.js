import pool from "../../../../components/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const body = await req.json();

  const subs = body.subs.split(",");

  cookies().set("categories", subs);

  const username = cookies().get("username").value;

  try {
    let result = pool.query(
      "UPDATE userlogin SET favgenres = $1 WHERE username = $2",
      [subs, username]
    );
  } catch (error) {
    console.log("UPDATE FAILED", error);
    return NextResponse.json({ message: "Internal Issue" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
