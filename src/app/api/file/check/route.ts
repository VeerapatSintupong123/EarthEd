import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const dynamicParams = true;
 
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('file');

  if (!fileName) {
    return NextResponse.json({ status: 'fail', error: 'No file specified' }, { status: 400 });
  }

  try {
    const filesInDirectory = await fs.readdir(path.join(process.cwd(), 'public/exam/'));
    const fileExists = filesInDirectory.includes(fileName);

    if(!fileExists)return NextResponse.json({ status: "fail"});
    else return NextResponse.json({ status: "success"});

  } catch (e) {
    return NextResponse.json({ status: "fail"});
  }
}
