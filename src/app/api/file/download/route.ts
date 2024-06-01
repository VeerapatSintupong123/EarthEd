import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('file');

  if (!fileName) {
    return NextResponse.json({ status: 'fail', error: 'No file specified' }, { status: 400 });
  }

  var filePath = "";
  if(fileName.match("history.csv")) 
    filePath = path.join(process.cwd(), 'public/data', fileName);
  else 
    filePath = path.join(process.cwd(), 'public/exam', fileName);
  

  try {
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    
    if (!fileExists) {
      return NextResponse.json({ status: 'fail', error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (e) {
    return NextResponse.json({ status: 'fail', error: e }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
