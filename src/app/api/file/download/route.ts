import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamicParams = true; 

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('file');

  if (!fileName) {
    return NextResponse.json({ status: 'fail', error: 'No file specified' }, { status: 400 });
  }

  let filePath;
  if (fileName === "history.csv") {
    filePath = path.join(process.cwd(), 'public/data', fileName);
  } else {
    filePath = path.join(process.cwd(), 'public/exam', fileName);
  }

  try {
    await fs.access(filePath);
    const fileBuffer = await fs.readFile(filePath); 

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ status: 'fail', error: 'Internal Server Error' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
