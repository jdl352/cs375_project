import pool from "../../../components/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    let result = await pool.query("SELECT * FROM threads;");
    return NextResponse.json({ ok: true, result: result }, { status: 200 });
  } catch (error) {
    console.log("UPDATE FAILED", error);
    return NextResponse.json({ message: "Internal Issue" }, { status: 500 });
  }
}
