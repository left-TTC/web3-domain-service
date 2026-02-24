
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { useNavigate } from "react-router-dom"
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv"
import { LayoutDashboard } from "lucide-react"
import { useGlobalModal } from "@/components/common/show/info"

const MyDomain = () => {

    const {t}= useTranslation()
    const navigate = useNavigate()

    const info = useGlobalModal()

    const {publicKey} = useWalletEnv()

    const [ifOnHover, setIfOnHover] = useState(false)

    const myDomainImg = () => {
        if(ifOnHover){
            return <LayoutDashboard size={20} style={{color: "#B4FC75"}}/>
        }
        return <LayoutDashboard size={20} style={{color: "white"}}/>
    }

    const goToUsrPage = () => {
        if(publicKey){
            navigate(`./usr?k=${publicKey}`)
        }else{
            info.showModal({
                title: "No Wallet",
                type: "warning",
                content: "Please connect wallet frist",
            })
        }
    }

    return(
        <button 
            className="flex row sm:p-[10px] gap-[5px] items-center"
            onMouseEnter={() => setIfOnHover(true)}    
            onMouseLeave={() => setIfOnHover(false)}
            onClick={() => goToUsrPage()}
        >
            {myDomainImg()}
            <h3 className={`${ifOnHover? "text-[#B4FC75]":"text-white"} font-500 text-[14px] hidden md:flex`}>{t("mydomain")}</h3>
        </button>
    )
}

export default MyDomain;
