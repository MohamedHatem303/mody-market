// 'use server';
// import { getAccessToken } from "@/schema/access-token";
// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";
// import { json } from "zod";

// export async function addToCart(productId:string){
//     const token = await getAccessToken()
//     if(!token){
//         throw new Error('Unauthorized')
//     }
//     const response = await fetch(`${process.env.API}/cart`,{
//         cache:'no-store',
//         method:'POST' , 
//         headers:{
//             token: token , 
//             'Content-Type':'application/json'
//         } , 
//         body:JSON.stringify({
//             productId
//         })
//         })
//         const payload = await response.json()
//         return payload
// }
// src/server/cart/add-prod-cart.ts

export async function addToCart(productId: string) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // مهم
    body: JSON.stringify({ productId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Unauthorized");
  }

  return data;
}
