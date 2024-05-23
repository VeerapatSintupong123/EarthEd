import { NextResponse } from 'next/server';
import UpdateAlert from '@/libs/updateAlert';

export async function PUT(req:Request){
    try{ 
        const {alert,id,token} = await req.json();
        await UpdateAlert(alert,id,token);
        return NextResponse.json({ message: 'success' });
    }
    catch(e){return NextResponse.json({ message: 'failed' });}
}