'use server';
import { getAccessToken } from "@/schema/access-token";
import { shippingAddress } from "@/types/cart-response";


export async function payCashOrder(cartId:string , shippingAddress:shippingAddress){
    const token = await getAccessToken()
    if(!token){
        throw new Error('Unauthorized')
    }
    const response = await fetch(`${process.env.API}/orders/${cartId}`,{
        method:'POST' , 
        headers:{
            token: token , 
            'Content-Type':'application/json'
        } , 
        body:JSON.stringify({
            shippingAddress
        })
        })
        const payload = await response.json()
        return payload
}
