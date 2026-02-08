// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req:NextRequest){
//     const token = await getToken({req})
//     if(!token){
//         return NextResponse.json({Error:"Unauthorized"},{status:401})
//     }
//     const res = await fetch(`${process.env.API}/cart`,{
//         method:"GET",
//         headers:{
//             token:token.token , 
//             "Content-Type":"application/json"
//         }
//     }) 
//     const payload = await res.json()
//     return NextResponse.json(payload)
// }
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/auth";

/**
 * GET → جلب الكارت
 */
export async function GET() {
  const session: any = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 401 }
    );
  }

  const res = await fetch(`${process.env.API}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: session.accessToken, // 🔥 مهم
    },
    cache: "no-store",
  });

  const payload = await res.json();
  return NextResponse.json(payload, { status: res.status });
}

/**
 * POST → إضافة منتج للكارت
 */
export async function POST(req: Request) {
  const session: any = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 401 }
    );
  }

  const { productId } = await req.json();

  const res = await fetch(`${process.env.API}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: session.accessToken,
    },
    body: JSON.stringify({ productId }),
  });

  const payload = await res.json();
  return NextResponse.json(payload, { status: res.status });
}

/**
 * PUT → تحديث الكمية
 */
export async function PUT(req: Request) {
  const session: any = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const cartItemId = body.cartItemId;
  const count = body.count;

  if (!cartItemId || typeof count !== "number") {
    return NextResponse.json(
      { message: "Invalid update cart payload", body },
      { status: 400 }
    );
  }

  // 🔥 ID في الـ URL + count في الـ body
  const res = await fetch(
    `${process.env.API}/cart/${cartItemId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: session.accessToken,
      },
      body: JSON.stringify({ count }),
    }
  );

  const payload = await res.json();
  return NextResponse.json(payload, { status: res.status });
}

/**
 * DELETE → حذف عنصر من الكارت
 */
export async function DELETE(req: Request) {
  const session: any = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 401 }
    );
  }

  const { productId } = await req.json();

  const res = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      token: session.accessToken,
    },
  });

  const payload = await res.json();
  return NextResponse.json(payload, { status: res.status });
}

/**
 * PATCH → تفريغ الكارت (Clear Cart)
 */
export async function PATCH() {
  const session: any = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 401 }
    );
  }

  const res = await fetch(`${process.env.API}/cart`, {
    method: "DELETE",
    headers: {
      token: session.accessToken,
    },
  });

  const payload = await res.json();
  return NextResponse.json(payload, { status: res.status });
}
