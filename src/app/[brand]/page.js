
import PhoneCardContainer from '../component/phoneCardContainer';
import { api } from '@/lib/api';

const Brand =async ({params}) => {
    const {brand} = await params;
    const res =await fetch(`${api}/api/brands/${brand}`);
    const jsonData = await res.json();
    const phones = jsonData.data;
  return (
     <>
      <h1 className='font-bold  mt-10 mb-10 text-2xl text-center'>{brand} Phones</h1>
      <PhoneCardContainer phones={phones} />
     </>
  )
}

export default Brand