'use server';
import { getAccessToken } from "@/schema/access-token";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { json } from "zod";

export async function clearCart(){
    const token = await getAccessToken()
    if(!token){
        throw new Error('Unauthorized')
    }
    const response = await fetch(`${process.env.API}/cart`,{
        method:'DELETE' , 
        headers:{
            token: token , 
            'Content-Type':'application/json'
        } 
        })
        const payload = await response.json()
        return payload
}
