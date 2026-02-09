import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/auth";

export async function GET() {
  const session: any = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 401 },
    );
  }

  const res = await fetch(`${process.env.API}/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: session.accessToken,
    },
    cache: "no-store",
  });

  const payload = await res.json();
  return NextResponse.json(payload, { status: res.status });
}

export async function POST(req: Request) {
  const session: any = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 401 },
    );
  }

  const { productId } = await req.json();

  const res = await fetch(`${process.env.API}/wishlist`, {
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

export async function DELETE(req: Request) {
  const session: any = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 401 },
    );
  }

  const { productId } = await req.json();

  const res = await fetch(`${process.env.API}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      token: session.accessToken,
    },
  });

  const payload = await res.json();
  return NextResponse.json(payload, { status: res.status });
}
