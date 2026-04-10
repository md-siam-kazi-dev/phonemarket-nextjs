import { api } from "@/lib/api";
import PhoneCard from "./PhoneCard";


const PhoneContainer =async ({phonePromis}) =>{
    const response =await fetch(`${api}/api/phones`,{cache:'no-store',}).then(res => res.json());
    console.log(response);
    const phones =await response.data;
    return (
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-fit  container-div gap-2 ">

        {phones.map(phone => {
            return(
                <PhoneCard key={phone.id} phone = {phone}></PhoneCard>
            )
        })}
        </div>
    )
    
}
export default PhoneContainer;