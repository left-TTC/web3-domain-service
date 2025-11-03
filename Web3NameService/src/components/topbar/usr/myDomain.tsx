

import myDomain from "@/assets/mydomain.svg"
import myDomainGreen from "@/assets/mydomaingreen.svg"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import "@/style/components/topbar/usr/myDomain.css"
import { useNavigate } from "react-router-dom"
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv"

const MyDomain = () => {

    const {t}= useTranslation()
    const navigate = useNavigate()

    const {publicKey} = useWalletEnv()

    const [ifOnHover, setIfOnHover] = useState(false)

    const myDomainImg = () => {
        if(ifOnHover){
            return myDomainGreen
        }
        return myDomain
    }

    const goToUsrPage = () => {
        if(publicKey){
            navigate(`./usr/${publicKey}`)
        }else{
            navigate(`./usr/`)
        }
    }

    return(
        <button 
            className={`topbarmydomain ${ifOnHover? "greenmydomain":""}`}
            onMouseEnter={() => setIfOnHover(true)}    
            onMouseLeave={() => setIfOnHover(false)}
            onClick={() => goToUsrPage()}
        >
            <img src={myDomainImg()} className="myDomainicon"/>
            <h1>{t("mydomain")}</h1>
        </button>
    )
}

export default MyDomain;
