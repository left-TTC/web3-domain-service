import MintChooser from "@/components/common/transaction/mintChooser"
import CustomValueSet from "@/components/usrPage/usrComponets/usrAuction/function/tool/customValueSet"
import { SupportedMint } from "@/provider/priceProvider/priceProvider"
import { useState } from "react"

import "@/style/components/usrPage/usrComponents/usrDomain/setpage/com/settleComponent/bills/setCustomPriceCrypto.css"
import SetCustomPriceBills from "@/components/common/transaction/settlebills/setCustomPriceBills"


export interface SetCustomPriceCryptoptoProps{

}

const SetCustomPriceCrypto: React.FC<SetCustomPriceCryptoptoProps> = ({

}) => {

    const [chooseMint, setChooseMint] = useState<SupportedMint>(SupportedMint.SOL)

    const [domainCustomValue, setDomainCustomValue] = useState<number | null>(null)

    return(
        <div className="SetCustomPriceCrypto">
            <div className="launchfeeway">
                <MintChooser 
                    activeMint={chooseMint} 
                    setActiveMint={setChooseMint} 
                />
                <div className="SetCustomPriceCryptoine"/>
                <CustomValueSet 
                    customValue={domainCustomValue}
                    setCustomValue={setDomainCustomValue}
                    ifCustomSetPage={true}
                />
            </div>
            <SetCustomPriceBills
                canBeConfirm={false}
                confirmFunction={()=>{}}
            />
        </div>
    )
}

export default SetCustomPriceCrypto;
