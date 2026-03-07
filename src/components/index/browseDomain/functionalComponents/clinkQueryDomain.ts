import { useReferrer } from "@/provider/referrerProvider.tsx/referrerProvider";
import { ifDomainLegal } from "@/utils/functional/domain/ifDomainLegal";
import { useNavigate } from "react-router-dom";



export function useClinkQueryDomain(
    queryDomainValue: string,
    activeRootDomain: string | null,
){
    const navigate = useNavigate()
    const {referrer} = useReferrer()

    const ClinkQuery = () => {
        if(queryDomainValue === "") return;
        
        if(ifDomainLegal(queryDomainValue)){
            const queryingDomain = queryDomainValue + "." + activeRootDomain;

            if(referrer){
                navigate(`/search?q=${encodeURIComponent(queryingDomain)}&r=${referrer}`);
            }else{
                navigate(`/search?q=${encodeURIComponent(queryingDomain)}`);
            }
        }else{
            //need add component
            console.log("inllegal domain")
        }
    }

    return { ClinkQuery }
}