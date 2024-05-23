import { NextResponse } from 'next/server';
import UpdateCourse from '@/libs/updateCourse';

export async function PUT(req:Request){
    try{ 
        const {title,description,image,video,id,token} = await req.json();
        await UpdateCourse(title,description,image,video,id,token);
        return NextResponse.json({ message: 'success' });
    }
    catch(e){return NextResponse.json({ message: 'failed' });}
}