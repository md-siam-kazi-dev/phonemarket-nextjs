import { useRouter } from "next/navigation"; // ✅ CORRECT;
import { useState } from "react";


const NavSearch = () => {
    const [searchValue,setSearchValue] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
      setSearchValue(e.target.value);
    }
    const handleSearchBtn = () => {
      if(!searchValue.trim()){
        return;
      }
      router.push(`/search/${(searchValue)}`);
      setSearchValue("");
    }
  return (
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
          <input type="search" required value={searchValue} placeholder="Search Phone" onChange={handleSearch}/>
        </label>
        <button className="btn btn-neutral" onClick={handleSearchBtn}>Search</button>
    </div>
  )
}

export default NavSearch