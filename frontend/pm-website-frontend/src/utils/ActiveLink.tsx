"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ReactElement, ReactNode  } from "react";



export default function ActiveLink(href : string , children : ReactElement) : ReactNode{

    const pathname = usePathname();

    return(
        <Link href={href} className={pathname == href || pathname.startsWith(href) ? "text-black" : ""}>{children}</Link>
    )
}
