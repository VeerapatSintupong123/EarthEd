import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file uploaded");
    }

    const fileName = file.name;
    const filePath = path.join(process.cwd(), 'public/exam/', fileName);

    // const filesInDirectory = await fs.readdir(path.join(process.cwd(), 'public/exam/'));
    // if (filesInDirectory.includes(fileName)) {
    //   return NextResponse.json({ status: "fail"});
    // }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    revalidatePath("/");

    return NextResponse.json({ status: "success" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail"});
  }
}
