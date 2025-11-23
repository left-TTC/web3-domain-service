import ExtractBills from "@/components/common/transaction/settlebills/extractBills";

import "@/style/components/usrPage/usrComponents/usrProfit/extractPage/extractCrypto.css"

interface ExtractCryptoProps {
    nowProfit: number,
}

const ExtractCryptoProps: React.FC<ExtractCryptoProps> = ({

}) => {

    return(
        <div className="SetCustomPriceCrypto">
            <div className="extractmount">
                
            </div>
            <ExtractBills
                canBeConfirm={false}
                confirmFunction={()=>{}}
            />
        </div>
    )
}

export default ExtractCryptoProps;
