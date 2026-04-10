import Link from "next/link";


const NavBar = () => {
  return (
    <div className="navbar md:w-17/20 mx-auto flex-col sm:flex-row bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">PHONEMARKET</Link>
      </div>
      <div className="flex gap-2">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search Phone" />
        </label>
        <button className="btn btn-neutral">Search</button>
      </div>
    </div>
  )
}

export default NavBar