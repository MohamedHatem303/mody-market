"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { DropdownMenuBasic } from "../dropDown/dropDown";
import { useQuery } from "@tanstack/react-query";
import { CartResponse } from "@/types/cart-response";

export default function Navbar() {
  const { status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  function toggleNav() {
    setIsOpen(!isOpen);
  }

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  const path = [
    { href: "/products", content: "Products" },
    { href: "/brands", content: "Brands" },
    { href: "/categories", content: "Categories" },
  ];

  const authpath = [
    { href: "/login", content: "Login" },
    { href: "/register", content: "Register" },
  ];

  const { data: cartData } = useQuery<CartResponse>({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      return res.json();
    },
  });

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
      <div className="container-padding max-w-7xl mx-auto relative">
        <div className="flex items-center h-16">
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <h1 className="text-[#5a0f1b] font-bold text-2xl">Mody Mart</h1>
            </Link>
          </div>

          <ul className="hidden md:flex flex-1 justify-center items-center gap-6">
            {path.map((elem) => (
              <li key={elem.content}>
                <Link
                  href={elem.href}
                  className="text-sm font-medium px-3 py-2 rounded-xl hover:bg-accent hover:text-primary transition"
                >
                  {elem.content}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 ml-auto">
            {status === "authenticated" ? (
              <>
                <Link
                  href="/cart"
                  className="relative p-2 rounded-xl hover:bg-accent transition"
                >
                  {(cartData?.numOfCartItems ?? 0) > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartData?.numOfCartItems ?? 0}
                    </span>
                  )}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </Link>

                <DropdownMenuBasic logout={logout} />
              </>
            ) : (
              authpath.map((elem) => (
                <Link
                  key={elem.content}
                  href={elem.href}
                  className="btn-primary"
                >
                  {elem.content}
                </Link>
              ))
            )}

            <button
              onClick={toggleNav}
              className="md:hidden inline-flex items-center justify-center rounded-xl border p-2 hover:bg-accent transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-background border-b">
            <ul className="flex flex-col items-center gap-4 p-4">
              {path.map((elem) => (
                <li key={elem.content}>
                  <Link
                    href={elem.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium"
                  >
                    {elem.content}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
