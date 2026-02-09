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
// client wrapper (updateCart)
'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function updateCartItem({
  cartItemId,
  count,
}: {
  cartItemId: string;
  count: number;
}) {
  const session: any = await getServerSession(authOptions);

  if (!session?.accessToken) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `${process.env.API}/cart/${cartItemId}`, // ✅ ID الصح
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: session.accessToken,
      },
      body: JSON.stringify({ count }),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Update failed");
  }

  return data;
}

