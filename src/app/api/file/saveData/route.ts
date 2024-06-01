import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req:Request) {
    try {
        const {data}  = await req.json();
        const filePath = path.join(process.cwd(),'public/data/','history.csv');
        fs.appendFileSync(filePath,data);
        return NextResponse.json({message:"Save data"});
    } catch (error) {
        return NextResponse.json({message:"Error"});
    }
}
