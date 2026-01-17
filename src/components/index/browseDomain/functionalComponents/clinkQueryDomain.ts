import { ifDomainLegal } from "@/utils/functional/domain/ifDomainLegal";
import { useNavigate } from "react-router-dom";



export function useClinkQueryDomain(
    queryDomainValue: string,
    activeRootDomain: string | null,
){
    const navigate = useNavigate()

    const ClinkQuery = () => {
        if(queryDomainValue === "") return;
        
        if(ifDomainLegal(queryDomainValue)){
            const queryingDomain = queryDomainValue + "." + activeRootDomain;

            navigate(`/search?q=${encodeURIComponent(queryingDomain)}`);
        }else{
            //need add component
            console.log("inllegal domain")
        }
    }

    return { ClinkQuery }
}