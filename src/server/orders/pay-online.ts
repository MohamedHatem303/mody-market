'use server';
import { getAccessToken } from "@/schema/access-token";
import { shippingAddress } from "@/types/cart-response";


export async function payOnlineOrder(cartId:string , shippingAddress:shippingAddress){
    const token = await getAccessToken()
    if(!token){
        throw new Error('Unauthorized')
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://mody-mart.vercel.app `,{
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
