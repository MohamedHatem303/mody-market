import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const token = await getToken({req})
    if(!token){
        return NextResponse.json({Error:"Unauthorized"},{status:401})
    }
    const res = await fetch(`${process.env.API}/cart`,{
        method:"GET",
        headers:{
            token:token.token , 
            "Content-Type":"application/json"
        }
    }) 
    const payload = await res.json()
    return NextResponse.json(payload)
}