// 'use server';
// import { getAccessToken } from "@/schema/access-token";
// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";
// import { json } from "zod";

// export async function updateCartItem({productId , count}:{productId:string , count:number}){
//     const token = await getAccessToken()
//     if(!token){
//         throw new Error('Unauthorized')
//     }
//     const response = await fetch(`${process.env.API}/cart/${productId}`,{
//         method:'PUT' , 
//         headers:{
//             token: token , 
//             'Content-Type':'application/json'
//         } ,
//         body: JSON.stringify({ count: count })
//         })
//         const payload = await response.json()
//         return payload
// }
export async function updateCart(body: any) {
  const res = await fetch("/api/cart", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
