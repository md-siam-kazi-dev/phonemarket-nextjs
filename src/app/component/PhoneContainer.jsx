

import { api } from "@/lib/api";

import PhoneCardContainer from "./phoneCardContainer";


const PhoneContainer =async ({phonePromis}) =>{
    const response =await fetch(`${api}/api/phones`,{next: { revalidate: 60 }}).then(res => res.json());
    console.log(response);
    
    return (
        <PhoneCardContainer  phonesData = {response}></PhoneCardContainer>
    )
    
}
export default PhoneContainer;