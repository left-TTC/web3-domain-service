

import myDomain from "@/assets/mydomain.svg"
import myDomainGreen from "@/assets/mydomaingreen.svg"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import "@/style/components/topbar/usr/myDomain.css"
import { useNavigate } from "react-router-dom"

const MyDomain = () => {

    const {t}= useTranslation()
    const navigate = useNavigate()

    const [ifOnHover, setIfOnHover] = useState(false)

    const myDomainImg = () => {
        if(ifOnHover){
            return myDomainGreen
        }
        return myDomain
    }

    const goToUsrPage = () => {
        navigate("./usr")
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
