import UpdateUser from '@/libs/updateUser';
import { NextResponse } from 'next/server';

export async function PUT(req:Request){
    try{ 
        const {fullName,gender,age,schoolName,schoolProvince,schoolLevel,token,id} = await req.json();
        await UpdateUser(fullName,gender,age,schoolName,schoolProvince,schoolLevel,token,id);
        return NextResponse.json({ message: 'success' });
    }
    catch(e){return NextResponse.json({ message: 'failed' });}
}