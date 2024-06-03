import { NextResponse } from 'next/server';
import AddCourse from '@/libs/addCourse';

export async function POST(req:Request){
    try{ 
        const {subject,title,sub,unit,chapter,description,image,video,token} = await req.json();
        await AddCourse(subject,sub,unit,title,chapter,description,image,video,token);
        return NextResponse.json({ message: 'success' });
    }
    catch(e){return NextResponse.json({ message: 'failed' });}
}