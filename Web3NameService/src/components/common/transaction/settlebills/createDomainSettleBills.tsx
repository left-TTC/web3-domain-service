import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/transaction/settleBills/settleBills.css"
import "@/style/components/commonStyle/transaction/settleBills/createDomainSettleBills.css"
import RentShow from "@/components/search/domainSettlement/functionComponents/show/rentShow";

export interface CreateDomainSettleBillsProps {
    confirmFunction: () => void;
    ifRefferverValid: boolean,
    price: number,
    solPrice: number | null,
    nameStateRent: number,
    refferrerRecordRent: number,
    ifRentCalculating: boolean,
    depositRatio: number,
    totalPrice: number,
}


const CreateDomainSettleBills: React.FC<CreateDomainSettleBillsProps> = ({
    confirmFunction, ifRefferverValid, price, solPrice, nameStateRent, 
    refferrerRecordRent, ifRentCalculating, depositRatio, totalPrice
}) => {

    const {t} = useTranslation()

    return(
        <div className="totalfees">
            <h1>{t("bill")}</h1>
            <div className="registerfee">
                <div className="registerrule">
                    <h1>{t("Startde")}</h1>
                </div>
                <h1>$ {(price/1e6 * depositRatio).toFixed(3)} ({solPrice? `${(price/1e6 * depositRatio * solPrice).toFixed(4)} SOL`:"Loading"})</h1>
            </div>
            <RentShow ifCalculating={ifRentCalculating} stateRent={nameStateRent} recordRent={refferrerRecordRent} />

            <div className="cryptodiliver"/>

            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h2>{totalPrice? `${(totalPrice/1e9).toFixed(4)} SOL`:"Calculating"}</h2>
                </div>
                <button className={`cryptoconfirmbutton ${(ifRefferverValid && !ifRentCalculating)? "":"invalidrefferrer"}`} onClick={confirmFunction}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default CreateDomainSettleBills;