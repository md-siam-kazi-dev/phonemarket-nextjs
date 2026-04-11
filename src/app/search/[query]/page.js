import PhoneCardContainer from '@/app/component/phoneCardContainer';
import { api } from '@/lib/api';
import React from 'react'

const SearchResult =async ({params}) => {
  const {query} = await params;
  const res = await fetch(`${api}/api/search?q=${query}`);
  const jsonData = await res.json()
  const phones = jsonData;
  return (
    <>
      <h1 className='text-bold text-2xl text-center mt-10 mb-10'>Search Result</h1>
      <PhoneCardContainer phonesData={jsonData} />

    </>
  )
}

export default SearchResult