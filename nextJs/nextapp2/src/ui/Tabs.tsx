'use client'

import AppLink from "@/model/AppLink";
import Link from "../../node_modules/next/link"

import {usePathname} from "../../node_modules/next/navigation";
import {FC} from "react";

interface TabsProps{
    links:AppLink[];
}

const Tabs:FC<TabsProps>=({links})=>{
    const pathname=usePathname();

    return(
        <ul className="nav nav-tabs">
            {
                links.map((link)=>(
                    <li className="nav-item" key={link.text}>
                        <Link className={pathname===link.path?"nav-link active":"nav-link passive"}
                        href={link.path}>
                            <i className={link.icon}/>{link.text}
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}
export default Tabs;