import RegisterUser from "@/libs/registerUser";
import { NextResponse } from 'next/server';

export async function POST(req:Request){
    try{ 
        const {name,tel,email,role,password,fullName,gender,age,schoolName,schoolProvince,schoolLevel} = await req.json();
        await RegisterUser(name,tel,email,role,password,fullName,gender,age,schoolName,schoolProvince,schoolLevel);
        return NextResponse.json({ message: 'success' });
    }
    catch(e){return NextResponse.json({ message: 'failed' });}
}