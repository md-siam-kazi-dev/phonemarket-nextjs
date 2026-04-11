'use client'
import Link from "next/link";
import NavSearch from "./NavSearch";



const NavBar = () => {
  
  return (
    <div className="navbar md:w-17/20 mx-auto flex-col sm:flex-row bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">PHONEMARKET</Link>
      </div>
      <NavSearch />
    </div>
  )
}

export default NavBar