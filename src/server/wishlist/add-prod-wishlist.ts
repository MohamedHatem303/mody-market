'use server';
import { getAccessToken } from "@/schema/access-token";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { json } from "zod";

export async function addToWishlist(productId:string){
    const token = await getAccessToken()
    console.log(token);
    
    if(!token){
        throw new Error('Unauthorized')
    }
    const response = await fetch(`${process.env.API}/wishlist`,{
        cache:'no-store',
        method:'POST' , 
        headers:{
            token: token , 
            'Content-Type':'application/json'
        } , 
        body:JSON.stringify({
            productId
        })
        })
        const payload = await response.json()
        return payload
}
