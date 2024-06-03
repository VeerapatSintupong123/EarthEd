import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { CSVRecord } from "../../../../../interface";

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

    if (!fileExists) {
      return NextResponse.json({ status: "fail", message: "File does not exist" });
    }

    const filePath = path.join(process.cwd(), 'public/exam/', fileName);
    const data = await fs.readFile(filePath, { encoding: "utf-8", flag: "r" });

    const records: CSVRecord[] = parse(data, {
      columns: true,
      skip_empty_lines: true
    });

    const formattedRecords = records.map((record: CSVRecord) => ({
      question: record.question,
      q1: record.q1,
      q2: record.q2,
      q3: record.q3,
      q4: record.q4,
      answer: record.answer,
      reason: record.reason,
      image: record.image
    }));

    return NextResponse.json({ status: "success", data: formattedRecords });
  } catch (e) {
    return NextResponse.json({ status: "fail"});
  }
}
