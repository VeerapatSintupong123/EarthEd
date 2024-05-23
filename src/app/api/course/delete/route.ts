import { NextResponse } from 'next/server';
import DeleteCourse from '@/libs/deleteCourse';

export async function DELETE(req:Request){
    try{ 
        const {id,token} = await req.json();
        await DeleteCourse(id,token);
        return NextResponse.json({ message: 'success' });
    }
    catch(e){return NextResponse.json({ message: 'failed' });}
}