import type { SmallInfoContextType } from "@/components/common/show/smallInfo";
import { useReferrer } from "@/provider/referrerProvider.tsx/referrerProvider";
import { ifDomainLegal } from "@/utils/functional/domain/ifDomainLegal";
import { useNavigate } from "react-router-dom";



export function useClinkQueryDomain(
    queryDomainValue: string,
    activeRootDomain: string | null,
    smallInfo: SmallInfoContextType,
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
            smallInfo.showToast({type:'error', message: "域名格式错误，不能大写，不能有空格，不能使用其他语言"})
            console.log("inllegal domain")
        }
    }

    return { ClinkQuery }
}