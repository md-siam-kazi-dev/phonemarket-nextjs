

import { api } from "@/lib/api";

import PhoneCardContainer from "./phoneCardContainer";


const PhoneContainer =async ({phonePromis}) =>{
    const response =await fetch(`${api}/api/phones`,{cache:'no-store',}).then(res => res.json());
    console.log(response);
    const phones =await response.data;
    return (
        <PhoneCardContainer phones={phones}></PhoneCardContainer>
    )
    
}
export default PhoneContainer;