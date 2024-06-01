import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get('file');

    if (!fileName) {
      throw new Error("No file name provided");
    }

    const filesInDirectory = await fs.readdir(path.join(process.cwd(), 'public/exam/'));
    const fileExists = filesInDirectory.includes(fileName);
    if(!fileExists)return NextResponse.json({ status: "fail"});
    else return NextResponse.json({ status: "success"});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail"});
  }
}
