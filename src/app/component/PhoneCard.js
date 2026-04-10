import Link from "next/link";


const PhoneCard = ({ phone }) => {
  return (
    <Link href={`/phones/${phone.slug}`}>
      <div className="border py-4 flex flex-col  justify-between items-center rounded-xl w-[300px] h-[350px] border-gray-300">
      <img className="mx-auto"
        src={phone.image_url}
        
        
      ></img>
      <div>
        <div className="mx-auto  w-fit font-bold text-[18px]">{phone.full_name}</div>
      <div className="mx-auto w-fit font-semibold text-[16px]">৳{phone.price_bdt}</div>
      <div className="mx-auto text-gray-400 w-fit font-semibold text-[16px]">Rating:{phone.rating}</div>
      
      </div>
      </div>
    </Link>
  );
};

export default PhoneCard;